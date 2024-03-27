// import from to project
const { Modal } = require("../modals/Modal");
const tinify = require("tinify");
const config= require("config");//Information storage - hidden, config
const path = require('path');
tinify.key = config.get("KEY_TINIFY");


const optimizeAndSaveImage = async (imageUrl, outputFilename) => {
    try {
        const source = await tinify.fromUrl(imageUrl);
        const outputPath = path.resolve(__dirname, '..','optimized-images', outputFilename);
        await source.toFile(outputPath);
    } catch (error) {
        res.status(400).send(error).json({mes:error});
    };
};

    const filterData = async () => {
        try {
            const data = await Modal.find();
            const filteredData = await Promise.all(data.map(async (item) => {
                const filteredItem = {
                    _id: item._id,
                    title: item.title,
                    icon: item.icon,
                    video: item.video,
                    image: item.image ? `/optimized-images/optimized_image${item._id}.png` : undefined,
                    imageContact: item.imageContact ? `/optimized-images/optimized_imageContact${item._id}.png` : undefined,
                    regions: item.regions && item.regions.map((region, i) => ({
                        _id: region._id,
                        country: region.country,
                        areas: region.areas,
                        hotels: region.hotels,
                        attractions: region.attractions,
                        countryEng: region.countryEng,
                        imagePage: region.imagePage,
                        storyOfOurTrip: region.storyOfOurTrip,
                        images: region.images,
                        image: region.image ? `/optimized-images/optimized_regions_image${item._id}_${i}.png` : undefined
                    }))
                };
                if (item.backgroundImage && item.backgroundImage.length > 0) {
                    filteredItem.backgroundImage = await Promise.all(item.backgroundImage.map(async (backgroundImage, index) =>
                        `/optimized-images/optimized_backgroundImage${item._id}_${index}.png`
                    ));
                }
                return filteredItem;
            }));
            return filteredData;
        } catch (error) {
            throw error;
        };
    };

    const dataGetMongo = async (req, res, next) => {
        try {
            const data = await Modal.find();

            // await Promise.all(data.map(async (item) => {
            //     if (item.image) {
            //         await optimizeAndSaveImage(item.image, `optimized_image${item._id}.png`);
            //     }

            //     if (item.backgroundImage) {
            //         await Promise.all(item.backgroundImage.map(async (backgroundImage, i) =>
            //             await optimizeAndSaveImage(backgroundImage, `optimized_backgroundImage${item._id}_${i}.png`)
            //         ));
            //     }

            //     if (item.imageContact) {
            //         await optimizeAndSaveImage(item.imageContact, `optimized_imageContact${item._id}.png`);
            //     }

            //     if (item.regions) {
            //         await Promise.all(item.regions.map(async (region, i) => {
            //             const image = region.image;
            //             if (image) {
            //                 await optimizeAndSaveImage(image, `optimized_regions_image${item._id}_${i}.png`);
            //             }
            //         }));
            //     }
            // }));

            // const filteredData = await filterData();
            // res.json(filteredData);
            res.json(data);
        } catch (error) {
            next(error);
        }
    };


exports.dataGetMongo = dataGetMongo;