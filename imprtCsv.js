import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import Player from "./models/Player.js";

mongoose.connect("mongodb+srv://gdgocpsit_db_user:lDRKLmID1knvmWj1@biddingbattle.juhlpbi.mongodb.net/?appName=BiddingBattlec");
const players = [];
const skipped = [];

fs.createReadStream("updated_list.csv")
  .pipe(
    csv({
      mapHeaders: ({ header }) =>
        header.replace(/\uFEFF/g, "").trim(), // 🔥 BOM FIX
    })
  )
  .on("data", (row) => {
    const name = row.name?.trim();

    const rating = Number(
      row.rating?.toString().replace(/,/g, "").trim()
    );
    const basePrice = Number(
      row.basePrice?.toString().replace(/,/g, "").trim()
    );

    // skip invalid rows
    if (!name || isNaN(rating) || isNaN(basePrice)) {
      skipped.push(row);
      return;
    }

    players.push({
      name,
      rating,
      basePrice,
      category: row.category?.trim(),
      profilePicture: row.profilePicture?.trim(),
      // status defaults to UNSOLD
    });
  })
  .on("end", async () => {
    try {
      await Player.insertMany(players);
      console.log(`✅ Imported ${players.length} players`);
      if (skipped.length) {
        console.log(`⚠️ Skipped ${skipped.length} bad rows`);
        console.table(skipped);
      }
      process.exit();
    } catch (err) {
      console.error("❌ Import failed:", err);
      process.exit(1);
    }
  });