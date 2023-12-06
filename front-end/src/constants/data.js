import images from "./images";

const gradient = "url(#blue-gradient)" ;


const about = [
    {
        id: 7,
        text: "MPR7"
    }
]
const portfolio = [
    {
        id: 16,
        title: "MPR",
        text: "Axial",
        image: images.axial,
    },
    {
        id: 17,
        title: "MPR",
        text: "Sagital",
        image: images.sagittal,
    },
    {
        id: 18,
        title: "MPR",
        text: "Coronal",
        image: images.coronal,
    }
];

const sections = {about,portfolio};

export default sections;