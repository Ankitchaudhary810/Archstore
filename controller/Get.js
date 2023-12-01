const fs = require('fs');

async function AllPageDataHandler(totalPage) {
    let alldata = [];

    for (let page = 1; page <= totalPage; page++) {
        const response = await fetch(`https://catfact.ninja/breeds?page=${page}`);
        const data = await response.json();
        alldata = [...alldata, ...data.data];
    }

    return alldata;
}


function groupByCountry(data) {
    const groupedData = {};

    data.forEach((breed) => {
        if (!groupedData[breed.country]) {
            groupedData[breed.country] = [];
        }

        groupedData[breed.country].push({

            breed: breed.breed,
            origin: breed.origin,
            coat: breed.coat,
            pattern: breed.pattern,
        });
    });

    return groupedData;
};



const handleGetData = async (req, res) => {
    try {
        const response = await fetch("https://catfact.ninja/breeds", {
            method: "GET"
        });

        const data = await response.json();

        console.log("number of pages => ", data.per_page);

        const AllPageData = await AllPageDataHandler(data.per_page);

        console.log(AllPageData);



        const groupedData = groupByCountry(AllPageData);

        var DataStream = fs.createWriteStream("data.txt");
        DataStream.write(JSON.stringify(groupedData));
        DataStream.end();

        return res.status(200).json(groupedData);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const handlePostRequest = async (req, res) => {
    try {
        const { str } = req.body;
        const length = 8;

        // const wordRegex = new RegExp(`\\b\\w{${length}}\\b`, 'g');
        // const matches = str.match(wordRegex);
        const words = str.match(/\S+/g);
        const wordLength = words.length;

        if (words.length >= 8) {
            return res.status(200).json("Ok")
        } else {
            return res.status(400).json("Not Acceptable")

        }


    } catch (error) {
        let err = error.message;
        console.log(err);
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
};


module.exports = {
    handleGetData,
    handlePostRequest
};
