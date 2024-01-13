const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "049f46f3fa80e57fe26083c44c5886c512da13f24610fa8a9a38145bd623920b90b303ec096c75106334617d89c143ac2a064026e985afd51719b9e4a5971f369b": 100,
  "04fc00d935397665eb911f82c7ac457b853acebcb1ba3f21213b0fc96fa495a6acbad3fda7916d0a8387540de64562c9b3fcbd7189bfacafb8f5394856693dec04": 50,
  "04a27263d3c9cc9fb3fbb9603215141fc8bb96969af3e213600164e49d591ee77a7df4b5e27b0bede4fa6129334d888c17445552b33b21f3a3130bc86c9deecdff": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
