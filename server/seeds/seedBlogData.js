const Blog = require('../models/BlogSchema')

const blogData = [
    {
        // "blog_id": "98ff2153-86df-4d10-9057-05b32d5a0639",
        "userId": "3fd5cdf6-e8c5-4bcb-a448-ad06abd8c105",
        "title": "7 Habits of Happy People",
        "description": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
        "categoryId": "1270e041-6167-48c2-94af-597ce39f9058",
        "image": "https://res.cloudinary.com/ddvcxup9j/image/upload/v1774871705/christina-wocintechchat-com-m-6Dv3pe-JnSg-unsplash_qugyog.jpg"
    },
    {
        // "blog_id": "eabbfe35-ba7f-4d91-a702-f2ad93ac8c9e",
        "userId": "fe2fc97b-b05a-4fac-9c68-d3d27d2aa0b2",
        "title": "How to Master Solo Travel",
        "description": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
        "categoryId": "3466a1f5-2439-445a-9657-8ef37e9d50e8",
        "image": "https://res.cloudinary.com/ddvcxup9j/image/upload/v1774871697/radowan-nakif-rehan-cYyqhdbJ9TI-unsplash_v0xjxe.jpg"
    },
    {
        // "blog_id": "d7f2ac11-65c0-4560-a836-308279224398",
        "userId": "3fd5cdf6-e8c5-4bcb-a448-ad06abd8c105",
        "title": "IoT and Athlete Performance",
        "description": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
        "categoryId": "4eac6ba0-d4b8-4d33-b85c-92178ae6bd3f",
        "image": "https://res.cloudinary.com/ddvcxup9j/image/upload/v1774871694/neom-eOWabmCNEdg-unsplash_efxgem.jpg"
    },
    {
        // "blog_id": "763174b2-76ec-426e-aad9-c393bd31e6ba",
        "userId": "fe2fc97b-b05a-4fac-9c68-d3d27d2aa0b2",
        "title": "5 Secrets to Better Sleep",
        "description": "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
        "categoryId": "6b8bc6fd-50a7-41ae-b61c-66320755131d",
        "image": "https://res.cloudinary.com/ddvcxup9j/image/upload/v1774871689/nasa-Q1p7bh3SHj8-unsplash_lrabbk.jpg"
    },
    {
        // "blog_id": "cd19d48e-51d5-401a-9945-3a25a77ad4d4",
        "userId": "3fd5cdf6-e8c5-4bcb-a448-ad06abd8c105",
        "title": "The Truth About Keto Diets",
        "description": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
        "categoryId": "b2bba74e-253c-44a9-8f52-8755fa9923c8",
        "image": "https://res.cloudinary.com/ddvcxup9j/image/upload/v1774871689/brooke-cagle-JBwcenOuRCg-unsplash_htnwjw.jpg"
    },
    {
        // "blog_id": "9fdff0d2-b892-480c-8295-ce3577374321",
        "userId": "fe2fc97b-b05a-4fac-9c68-d3d27d2aa0b2",
        "title": "How to Bake Perfect Cookies",
        "description": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
        "categoryId": "b6c5470e-2efa-4d9c-ad1d-a5285fc10f2d",
        "image": "https://res.cloudinary.com/ddvcxup9j/image/upload/v1774868298/blog-app/ar31v9u6rhoezwvbo13o.jpg"
    },
    {
        // "blog_id": "5393f654-4715-4e8e-9462-b60755b79aad",
        "userId": "3fd5cdf6-e8c5-4bcb-a448-ad06abd8c105",
        "title": "VR: The Future of Fan Gear",
        "description": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
        "categoryId": "4eac6ba0-d4b8-4d33-b85c-92178ae6bd3f",
        "image": "https://res.cloudinary.com/ddvcxup9j/image/upload/v1774871689/nasa-Q1p7bh3SHj8-unsplash_lrabbk.jpg"
    },
    {
        // "blog_id": "946fc8ed-be58-4d66-aaee-b68eec890c9e",
        "userId": "fe2fc97b-b05a-4fac-9c68-d3d27d2aa0b2",
        "title": "Next-Gen Wearable Tech",
        "description": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
        "categoryId": "4eac6ba0-d4b8-4d33-b85c-92178ae6bd3f",
        "image": "https://res.cloudinary.com/ddvcxup9j/image/upload/v1774871689/lily-banse--YHSwy6uqvk-unsplash_jdtraj.jpg"
    },
    {
        // "blog_id": "d30810f9-9903-40ee-94f6-b90c1e0ea036",
        "userId": "3fd5cdf6-e8c5-4bcb-a448-ad06abd8c105",
        "title": "5 Top Sports Analytics Tools",
        "description": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
        "categoryId": "b2bba74e-253c-44a9-8f52-8755fa9923c8",
        "image": "https://res.cloudinary.com/ddvcxup9j/image/upload/v1774871850/markus-spiske-WUehAgqO5hE-unsplash_hcsizn.jpg"
    },
    {
        // "blog_id": "46fcbdb5-aece-43c6-91f0-64c48f7906e9",
        "userId": "bc9cc3d9-f972-4f79-bcf0-bb1b3bd10f6f",
        "title": "Cloud Computing for Teams",
        "description": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
        "categoryId": "b6c5470e-2efa-4d9c-ad1d-a5285fc10f2d",
        "image": "https://res.cloudinary.com/ddvcxup9j/image/upload/v1774868298/blog-app/ar31v9u6rhoezwvbo13o.jpg"
    }
]
    ;

const createData = async () => {
    try {
        await Blog.bulkCreate(blogData)
    } catch (error) {
        console.log(error)
    }
}

createData();