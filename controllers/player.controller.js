import express from "express"
import Player from "../models/players.js"


export const getPlayers = async (req, res) => {
    try {
        const players = await Player.find()

        res.status(200).json(players)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPlayer = async (req, res) => {
    const player = req.body
    if(Player.findOne({name:player.name})) return res.status(409).json({ message: "Player already exists" })
    const newPlayer = new Player(player)
    try {
        await newPlayer.save()
        res.status(201).json(newPlayer)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePlayer = async (req, res) => {
    const { id: _id } = req.params
    const player = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No player with that id')
    const updatedPlayer = await Player.findByIdAndUpdate(_id, { ...player, _id }, { new: true })
    res.json(updatedPlayer)
}

export const deletePlayer = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No player with that id')
    await Player.findByIdAndRemove(id)
    res.json({ message: 'Player deleted successfully' })
}

export const getPlayer = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No player with that id')
    const player = await Player.findById(id)
    res.json(player)
}
