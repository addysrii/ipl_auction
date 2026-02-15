import Team from "../models/Team.js";

export const createTeam = async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
};

export const getTeams = async (req, res) => {
  const teams = await Team.find().populate("players");
  res.json(teams);
};
export const getTeam = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No player with that id')
    const team = await Team.findById(id)
    res.json(team)
}
export const deleteTeam = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No player with that id')
    await Team.findByIdAndRemove(id)
    res.json({ message: 'Team deleted successfully' })
}
export const updateTeam = async (req, res) => {
    const { id: _id } = req.params
    const team = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No player with that id')
    const updatedTeam = await Team.findByIdAndUpdate(_id, { ...team, _id }, { new: true })
    res.json(updatedTeam)
}
export const teamLogin = async (req,res) => {
const { name, password } = req.body;

  const team = await Team.findOne({ name });

  if (!team) {
    return res.status(404).json({
      message: "Team not found"
    });
  }
  if (team.password !== password) {
    return res.status(401).json({
      message: "Invalid password"
    });
  }

  res.json(team);
}