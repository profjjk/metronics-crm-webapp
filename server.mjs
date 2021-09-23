import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));

app.use((req, res) => {
    if (req.url === '/test') {
        res.write("<h1>TEST</h1>")
        res.end();
    }
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));