import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import FoodModel from './models/Foodmodel.js'; 

// Load environment variables from .env file
dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// DYNAMIC FOLDER DETECTION: Check both 'upload' (singular) and 'uploads' (plural)
let UPLOADS_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
    const alternativeDir = path.join(process.cwd(), 'upload');
    if (fs.existsSync(alternativeDir)) {
        UPLOADS_DIR = alternativeDir;
    }
}

async function migrateImages() {
    try {
        console.log(" Starting database to Cloudinary image migration...");

        // Connect to MongoDB using whatever variable name you defined in your .env
        const mongoURI = 
            process.env.DATABASE_URL || 
            process.env.MONGO_URI || 
            process.env.MONGODB_URI || 
            process.env.MONGO_URL || 
            process.env.MONGODB_URL || 
            process.env.DB_URL;

        if (!mongoURI) {
            throw new Error(
                " MongoDB connection string is missing.\n" +
                "Please make sure your .env file has one of these variables defined:\n" +
                "MONGO_URI, MONGODB_URI, MONGO_URL, or DATABASE_URL"
            );
        }
        await mongoose.connect(mongoURI);
        console.log(" Successfully connected to MongoDB database.");
        
        // --- DIAGNOSTIC LOGS ---
        console.log(` Connected to Database: "${mongoose.connection.name}"`);
        console.log(` Querying collection associated with model: "${FoodModel.collection.name}"`);
        console.log(` Using Local Image Folder: "${UPLOADS_DIR}"`);

        // Read all files currently sitting inside the local folder
        let localFiles = [];
        if (fs.existsSync(UPLOADS_DIR)) {
            localFiles = fs.readdirSync(UPLOADS_DIR);
            console.log(` Files found inside your folder (${localFiles.length} total)`);
        } else {
            console.log(`    Error: Neither "uploads" nor "upload" folders exist in ${process.cwd()}`);
            process.exit(1);
        }

        // Fetch all products
        const products = await FoodModel.find({});
        console.log(` Total products found in collection: ${products.length}`);
        
        // Filter out products already using web URLs
        const legacyProducts = products.filter(product => product.image && !product.image.startsWith('http'));

        if (legacyProducts.length === 0) {
            console.log("\n No legacy local image paths found! All database images are already using Cloudinary URLs or the collection is empty.");
            process.exit(0);
        }

        console.log(`\n Found ${legacyProducts.length} items needing migration. Beginning bulk upload...`);

        let successCount = 0;
        let failCount = 0;

        for (const product of legacyProducts) {
           
            console.log(` Processing: "${product.name}"`);
            console.log(` Expected DB image path: "${product.image}"`);

            // Extract base name from DB image path (e.g., "1782202915079_food_1.png" -> "food_1.png")
            const dbParts = product.image.split('_');
            const baseName = dbParts.length > 1 ? dbParts.slice(1).join('_') : product.image;

            // Find a physical file in your uploads folder that has the same base name suffix
            const matchedFileName = localFiles.find(file => {
                const fileParts = file.split('_');
                const fileBaseName = fileParts.length > 1 ? fileParts.slice(1).join('_') : file;
                return fileBaseName.toLowerCase() === baseName.toLowerCase();
            });

            if (!matchedFileName) {
                console.warn(` Warning: No file matching suffix "*_${baseName}" found in local folder. Skipping...`);
                failCount++;
                continue;
            }

            const localFilePath = path.join(UPLOADS_DIR, matchedFileName);
            console.log(` Fuzzy match found: "${matchedFileName}"`);
            console.log(` Local file path: ${localFilePath}`);

            try {
                console.log(` Uploading matched file to Cloudinary...`);
                
                // Upload local file to Cloudinary
                const result = await cloudinary.uploader.upload(localFilePath, {
                    folder: 'foodora_products',
                    use_filename: true, // Try to preserve original filename
                    unique_filename: false
                });

                console.log(` Uploaded! Secure URL: ${result.secure_url}`);

                // Update MongoDB record with the Cloudinary URL
                product.image = result.secure_url;
                await product.save();

                console.log(` Database updated successfully for: "${product.name}"`);
                successCount++;
            } catch (uploadError) {
                console.error(` Error uploading or updating "${product.name}":`, uploadError.message);
                failCount++;
            }
        }

       
        console.log(`Migration Completed!`);
        console.log(`Successfully Migrated: ${successCount} products`);
        console.log(` Failed/Skipped: ${failCount} products`);
       

    } catch (error) {
        console.error(" Fatal migration error:", error);
    } finally {
        // Disconnect database connection cleanly
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log(" Disconnected from MongoDB.");
        }
        process.exit(0);
    }
}

// Start migration running on execution
migrateImages();