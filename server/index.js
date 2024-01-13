const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "049f46f3fa80e57fe26083c44c5886c512da13f24610fa8a9a38145bd623920b90b303ec096c75106334617d89c143ac2a064026e985afd51719b9e4a5971f369b": 100,
  "04fc00d935397665eb911f82c7ac457b853acebcb1ba3f21213b0fc96fa495a6acbad3fda7916d0a8387540de64562c9b3fcbd7189bfacafb8f5394856693dec04": 50,
  "0484cd1298d8a6af818749446c7bd398296dffa8a1a4f49184665f88bc974aaa789acdfdcfd8952877cd3a9e315965d73d600ff568aa3e04e79ed053270f998c45": 75,
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
