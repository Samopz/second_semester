import * as authorService from '../services/author.service.js';

export const login = async (req, res) => {
    try {
    const { email, password } = req.body;
    const token = await authorService.login(email, password);
        res.json({
            message: "Login successful!",
            data: {
                accessToken: token,
            },
        });
    } catch (err) {
        res.status(err.status || 500);
        res.json({ message: err.message });
    }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await authorService.register(name, email, password, "USER");
    res.json({
      message: "User created successfully",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({ message: err.message });
  }
};