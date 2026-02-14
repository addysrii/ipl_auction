// import express from "express"
// import mongoose from 'mongoose'
// import  from "../models/team.js"

// const createTeam = async(req,res) =>{
// const teams = req.body
// console.log(teams.name)
//    const existingTeam = await Teams.findOne({ name: teams.name });

//     if (existingTeam) {
//       return res.status(409).json({ message: "team already exists" });
//     }
// const newTeam = new Teams(teams)
// try {
//     await newTeam.save()
//     res.status(201).json(newTeam)
// } catch (error) {
//     res.status(409).json({ message: error.message })
// }
// }
// const getTeam = async(req,res) =>{
//     const { id } = req.params
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No player with that id')
//     const team = await team.findById(id)
//     res.json(team)
// }

// export {createTeam,getTeam}

