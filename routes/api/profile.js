const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");
const { check, validationResult } = require("express-validator");

// Get current user profile

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create or update user profile

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      team,
      video,
      country,
      age,
      bio,
      status,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (team) profileFields.team = team;
    if (age) profileFields.age = age;
    if (video) profileFields.video = video;
    if (country) profileFields.country = country;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    // Build social object

    profileFields.social = {};
    if (youtube) profileFields.youtube = youtube;
    if (facebook) profileFields.facebook = facebook;
    if (twitter) profileFields.twitter = twitter;
    if (instagram) profileFields.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  }
);

// Get all profiles

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get profile by user id

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// Delete profile, user and post

router.delete("/", auth, async (req, res) => {
  try {
    await Promise.all([
      Post.deleteMany({ user: req.user.id }),
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id }),
    ]);

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add profile experience

router.put(
  "/experience",
  [
    auth,
    [
      check("position", "Position is required").not().isEmpty(),
      check("team", "Team is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { position, team, country, from, to, current, description } =
      req.body;

    const newExp = {
      position,
      team,
      country,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Delete experience

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add profile education

router.put(
  "/stats",
  [
    auth,
    [
      check("team", "School or Academy is required").not().isEmpty(),
      check("season", "Season is required").not().isEmpty(),
      check("goalasisst", "G/A is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { team, season, goalasisst, from, to, current, description } =
      req.body;

    const newStats = {
      team,
      season,
      goalasisst,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.stats.unshift(newStats);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//  Delete stats

router.delete("/stats/:sta_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.stats
      .map((item) => item.id)
      .indexOf(req.params.sta_id);
    profile.stats.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
