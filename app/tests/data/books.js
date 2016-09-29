function formatAPIData(book, id) {
  return {
    title: book.title,
    authors: book.authors,
    categories: book.categories,
    description: book.description,
    image: book.imageLinks ? book.imageLinks.thumbnail.replace('zoom=1', 'zoom=2') : null,
    isbn: book.industryIdentifiers ? book.industryIdentifiers[0].identifier : null,
    altId: id
  };
}

const serverRes = {
  "message":"We have successfully retrieved your books",
  "books":[
    {
      "title":"2666",
      "altId":"nMWpPtYLuo0C",
      "isbn":"9780374100148",
      "authors":[
        "Roberto Bolaño",
        "Natasha Wimmer"
      ],
      "image":"http://books.google.com/books/content?id=nMWpPtYLuo0C&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
      "categories":[
        "Fiction"
      ],
      "description":"An American sportswriter, an elusive German novelist, and a teenage student interact in an urban community on the U.S.-Mexico border where hundreds of young factory workers have disappeared.",
      "available":1,
      "createdAt":"2016-09-26T18:18:02.108Z",
      "updatedAt":"2016-09-26T18:18:02.108Z"
    },
    {
      "title":"Catch-22",
      "altId":"Xfze51E7TEoC",
      "isbn":"9780684865133",
      "authors":[
        "Joseph Heller"
      ],
      "image":"http://books.google.com/books/content?id=Xfze51E7TEoC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
      "categories":[
        "Fiction"
      ],
      "description":"Presents the contemporary classic depicting the struggles of a U.S. airman attempting to survive the lunacy and depravity of a World War II base",
      "available":1,
      "createdAt":"2016-09-26T18:14:59.294Z",
      "updatedAt":"2016-09-26T18:14:59.294Z"
    },
    {
      "title":"The Metamorphosis",
      "altId":"QM2TFLoJp3gC",
      "isbn":"0307717003",
      "authors":[
        "Franz Kafka"
      ],
      "image":"http://books.google.com/books/content?id=QM2TFLoJp3gC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
      "categories":[
        "Comics & Graphic Novels"
      ],
      "description":"A brilliant, darkly comic reimagining of Kafka’s classic tale of family, alienation, and a giant bug. Acclaimed graphic artist Peter Kuper presents a kinetic illustrated adaptation of Franz Kafka’s The Metamorphosis. Kuper’s electric drawings—where American cartooning meets German expressionism—bring Kafka’s prose to vivid life, reviving the original story’s humor and poignancy in a way that will surprise and delight readers of Kafka and graphic novels alike. From the Hardcover edition.",
      "available":1,
      "createdAt":"2016-09-26T18:12:48.315Z",
      "updatedAt":"2016-09-26T18:12:48.315Z"
    },
    {
      "title":"Moby Dick",
      "altId":"XV8XAAAAYAAJ",
      "isbn":"HARVARD:HN1E4C",
      "authors":[
        "Herman Melville"
      ],
      "image":"http://books.google.com/books/content?id=XV8XAAAAYAAJ&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
      "categories":[
        "Sea stories"
      ],
      "description":"A literary classic that wasn't recognized for its merits until decades after its publication, Herman Melville's Moby-Dick tells the tale of a whaling ship and its crew, who are carried progressively further out to sea by the fiery Captain Ahab. Obsessed with killing the massive whale, which had previously bitten off Ahab's leg, the seasoned seafarer steers his ship to confront the creature, while the rest of the shipmates, including the young narrator, Ishmael, and the harpoon expert, Queequeg, must contend with their increasingly dire journey. The book invariably lands on any short list of the greatest American novels.",
      "available":1,
      "createdAt":"2016-09-26T18:10:49.198Z",
      "updatedAt":"2016-09-26T18:10:49.198Z"
    },
    {
      "title":"Walden",
      "altId":"6maY9blMuoMC",
      "isbn":"0807014257",
      "authors":[
        "Henry David Thoreau",
        "Bill McKibben"
      ],
      "image":"http://books.google.com/books/content?id=6maY9blMuoMC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
      "categories":[
        "Literary Criticism"
      ],
      "description":"The classic chronicle of a communion with nature at Walden Pond offers a message of living simply and in harmony with nature, in a 150th anniversary edition that includes an updated introduction and annotations by the author of The End of Nature. Reprint.",
      "available":1,
      "createdAt":"2016-09-23T00:33:35.989Z",
      "updatedAt":"2016-09-23T00:33:35.989Z"
    },
    {
      "title":"The Crying of Lot 49",
      "altId":"IVDEZ4v6eG0C",
      "isbn":"9781101594605",
      "authors":[
        "Thomas Pynchon"
      ],
      "image":"http://books.google.com/books/content?id=IVDEZ4v6eG0C&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
      "categories":[
        "Fiction"
      ],
      "description":"The highly original satire about Oedipa Maas, a woman who finds herself enmeshed in a worldwide conspiracy, meets some extremely interesting characters and attains a not inconsiderable amount of self-knowledge.",
      "available":1,
      "createdAt":"2016-09-19T23:34:05.594Z",
      "updatedAt":"2016-09-22T20:21:35.453Z"
    },
    {
      "title":"The Trial",
      "altId":"OCZqAwAAQBAJ",
      "isbn":"9783736802391",
      "authors":[
        "Franz Kafka"
      ],
      "image":"http://books.google.com/books/content?id=OCZqAwAAQBAJ&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
      "categories":[
        "Fiction"
      ],
      "description":"The Trial is a novel written by Franz Kafka. One of Kafka's best-known works, it tells the story of a man arrested and prosecuted by a remote, inaccessible authority, with the nature of his crime revealed to neither him nor the reader. The terrifying tale of Joseph K, a respectable functionary in a bank, who is suddenly arrested and must defend his innocence against a charge about which he can get no information. A nightmare vision of the excesses of modern bureaucracy wedded to the mad agendas of twentieth-century totalitarian regimes. Look at Joseph K., a bank officer living in a country with a constitution. He wakes up one day with strange men in his apartment telling him he's under arrest. Why or for what offense, no one knows. The arresting officers themselves don't know and can't tell him. Even if he's under arrest, however, no one picks him up or locks him in jail. He can still go to his office, work, perform his customary daily chores, and do whatever he wants to do as he awaits his trial. But he is understandably anxious and worried. He is, after all, charged with an unknown but very grave offense. He has a criminal case. He is an accused. He is under arrest. For this problem he consults so many. He gets a lawyer. His uncle comes to his aid. He talks with his lawyer's other client--also charged and under arrest like him. He consults other people, a painter (who is said to know the \"Court\"), some women, a priest, etc. about his case. But no one can tell him what the charge is and what his sentence will be. The \"Examining Magistrate,\" the \"Judges,\" the \"Court,\" the proceedings/ trial, and even the \"Law\" itself--they all seem to be unsolvable enigmas.",
      "available":1,
      "createdAt":"2016-09-21T20:34:40.918Z",
      "updatedAt":"2016-09-22T00:03:48.872Z"
    },
    {
      "title":"A Scanner Darkly",
      "altId":"hg9njt3vmgQC",
      "isbn":"9780547572178",
      "authors":[
        "Philip K. Dick"
      ],
      "image":"http://books.google.com/books/content?id=hg9njt3vmgQC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
      "categories":[
        "Fiction"
      ],
      "description":"Bob Arctor is a junkie and a drug-dealer, both using and selling the mind-altering Substance D. Fred is a law enforcement agent, tasked with bringing Bob down. It sounds like a standard case. The only problem is that Bob and Fred are the same person. In order to infiltrate the drug ring he hopes to bring down, Fred has had to use Substance D, but Substance D, or \"Slow Death,\" causes the consciousness to split in two, creating distinct personalities that are entirely unaware of the other's existence. Now, Bob must keep from being caught by Fred, while Fred must keep his suspicious superiors at bay. In this semi-autobiographical novel, Dick looks back on his own drug abuse and his own friends who he lost to drugs. By turns thrilling, mind-bending, laught-out-loud funny, and heart-wrenchingly sad, A Scanner Darkly is an award-winning book made into a cult film and may just be Dick's best novel.",
      "available":1,
      "createdAt":"2016-09-21T02:50:11.514Z",
      "updatedAt":"2016-09-21T02:50:11.514Z"
    },
    {
      "title":"Adventures of Huckleberry Finn",
      "altId":"JLXCAgAAQBAJ",
      "isbn":"9780486132457",
      "authors":[
        "Mark Twain"
      ],
      "image":"http://books.google.com/books/content?id=JLXCAgAAQBAJ&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
      "categories":[
        "Fiction"
      ],
      "description":"Join Huck and Jim as their boyhood adventures along the Mississippi River lead them into a world of excitement, danger, and self-discovery. Humorous narrative, lyrical descriptions of the Mississippi valley, and memorable characters.",
      "available":1,
      "createdAt":"2016-09-19T01:14:29.731Z",
      "updatedAt":"2016-09-21T02:46:30.158Z"
    },
    {
      "title":"Infinite Jest",
      "altId":"Nhe2yvx6hP8C",
      "isbn":"0316073857",
      "authors":[
        "David Foster Wallace"
      ],
      "image":"http://books.google.com/books/content?id=Nhe2yvx6hP8C&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
      "categories":[
        "Fiction"
      ],
      "description":"A gargantuan, mind-altering comedy about the Pursuit of Happiness in America set in an addicts' halfway house and a tennis academy, and featuring the most endearingly screwed-up family to come along in recent fiction, Infinite Jest explores essential questions about what entertainment is and why it has come to so dominate our lives; about how our desire for entertainment affects our need to connect with other people; and about what the pleasures we choose say about who we are. Equal parts philosophical quest and screwball comedy, Infinite Jest bends every rule of fiction without sacrificing for a moment its own entertainment value. It is an exuberant, uniquely American exploration of the passions that make us human - and one of those rare books that renew the idea of what a novel can do.",
      "available":1,
      "createdAt":"2016-09-18T22:30:22.718Z",
      "updatedAt":"2016-09-21T02:44:21.548Z"
    }
  ]
};

const googleRes = {
 "kind": "books#volumes",
 "totalItems": 1059,
 "items": [
  {
   "kind": "books#volume",
   "id": "d7XD9MUs8_oC",
   "etag": "OZc6QtdhwrY",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/d7XD9MUs8_oC",
   "volumeInfo": {
    "title": "Brave New World Revisited",
    "authors": [
     "Aldous Huxley"
    ],
    "publisher": "Harper Collins",
    "publishedDate": "2000-02-16",
    "description": "Written thirty years after his epic novel Brave New World, this thoughtprovoking sequel describes the shocking scientific devices and techniques available to any group in a position to manipulate society. Reprint.",
    "industryIdentifiers": [
     {
      "type": "ISBN_13",
      "identifier": "9780060955519"
     },
     {
      "type": "ISBN_10",
      "identifier": "0060955511"
     }
    ],
    "readingModes": {
     "text": false,
     "image": false
    },
    "pageCount": 130,
    "printType": "BOOK",
    "categories": [
     "Fiction"
    ],
    "averageRating": 3.0,
    "ratingsCount": 5,
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": false,
    "contentVersion": "preview-1.0.0",
    "imageLinks": {
     "smallThumbnail": "http://books.google.com/books/content?id=d7XD9MUs8_oC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
     "thumbnail": "http://books.google.com/books/content?id=d7XD9MUs8_oC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com/books?id=d7XD9MUs8_oC&printsec=frontcover&dq=Brave+New+World&hl=&cd=1&source=gbs_api",
    "infoLink": "http://books.google.com/books?id=d7XD9MUs8_oC&dq=Brave+New+World&hl=&source=gbs_api",
    "canonicalVolumeLink": "http://books.google.com/books/about/Brave_New_World_Revisited.html?hl=&id=d7XD9MUs8_oC"
   },
   "saleInfo": {
    "country": "US",
    "saleability": "NOT_FOR_SALE",
    "isEbook": false
   },
   "accessInfo": {
    "country": "US",
    "viewability": "PARTIAL",
    "embeddable": true,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
    "epub": {
     "isAvailable": false
    },
    "pdf": {
     "isAvailable": false
    },
    "webReaderLink": "http://books.google.com/books/reader?id=d7XD9MUs8_oC&hl=&printsec=frontcover&output=reader&source=gbs_api",
    "accessViewStatus": "SAMPLE",
    "quoteSharingAllowed": false
   },
   "searchInfo": {
    "textSnippet": "Written thirty years after his epic novel Brave New World, this thoughtprovoking sequel describes the shocking scientific devices and techniques available to any group in a position to manipulate society. Reprint."
   }
  },
  {
   "kind": "books#volume",
   "id": "niDNtZoYsAUC",
   "etag": "0Na2jRo/OpA",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/niDNtZoYsAUC",
   "volumeInfo": {
    "title": "Brave New World",
    "authors": [
     "Aldous Huxley"
    ],
    "publisher": "RosettaBooks",
    "publishedDate": "2010-07-01",
    "description": "Huxley's bleak future prophesized in Brave New World was a capitalist civilization which had been reconstituted through scientific and psychological engineering, a world in which people are genetically designed to be passive and useful to the ruling class. Satirical and disturbing, Brave New World is set some 600 years ahead, in \"this year of stability, A.F. 632\"--the A.F. standing for After Ford, meaning the godlike Henry Ford. \"Community, Identity, Stability,\" is the motto. Reproduction is controlled through genetic engineering, and people are bred into a rigid class system. As they mature, they are conditioned to be happy with the roles that society has created for them. The rest of their lives are devoted to the pursuit of pleasure through sex, recreational sports, the getting and having of material possessions, and taking a drug called Soma. Concepts such as family, freedom, love, and culture are considered grotesque. Against this backdrop, a young man known as John the Savage is brought to London from the remote desert of New Mexico. What he sees in the new civilization a \"brave new world\" (quoting Shakespeare's The Tempest). However, ultimately, John challenges the basic premise of this society in an act that threatens and fascinates its citizens. Huxley uses his entire prowess to throw the idea of utopia into reverse, presenting us what is known as the \"dystopian\" novel. When Brave New World was written (1931), neither Hitler nor Stalin had risen to power. Huxley saw the enduring threat to society from the dark side of scientific and social progress, and mankind's increasing appetite for simple amusement. Brave New World is a work that indicts the idea of progress for progress sake and is backed up with force and reason.",
    "industryIdentifiers": [
     {
      "type": "ISBN_10",
      "identifier": "0795311257"
     },
     {
      "type": "ISBN_13",
      "identifier": "9780795311253"
     }
    ],
    "readingModes": {
     "text": true,
     "image": false
    },
    "pageCount": 288,
    "printType": "BOOK",
    "categories": [
     "Fiction"
    ],
    "averageRating": 3.5,
    "ratingsCount": 2752,
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": true,
    "contentVersion": "1.6.3.0.preview.2",
    "imageLinks": {
     "smallThumbnail": "http://books.google.com/books/content?id=niDNtZoYsAUC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
     "thumbnail": "http://books.google.com/books/content?id=niDNtZoYsAUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com/books?id=niDNtZoYsAUC&printsec=frontcover&dq=Brave+New+World&hl=&cd=2&source=gbs_api",
    "infoLink": "http://books.google.com/books?id=niDNtZoYsAUC&dq=Brave+New+World&hl=&source=gbs_api",
    "canonicalVolumeLink": "http://books.google.com/books/about/Brave_New_World.html?hl=&id=niDNtZoYsAUC"
   },
   "saleInfo": {
    "country": "US",
    "saleability": "NOT_FOR_SALE",
    "isEbook": false
   },
   "accessInfo": {
    "country": "US",
    "viewability": "PARTIAL",
    "embeddable": true,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
     "isAvailable": true,
     "acsTokenLink": "http://books.google.com/books/download/Brave_New_World-sample-epub.acsm?id=niDNtZoYsAUC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
    },
    "pdf": {
     "isAvailable": false
    },
    "webReaderLink": "http://books.google.com/books/reader?id=niDNtZoYsAUC&hl=&printsec=frontcover&output=reader&source=gbs_api",
    "accessViewStatus": "SAMPLE",
    "quoteSharingAllowed": false
   },
   "searchInfo": {
    "textSnippet": "Huxley uses his entire prowess to throw the idea of utopia into reverse, presenting us what is known as the &quot;dystopian&quot; novel. When Brave New World was written (1931), neither Hitler nor Stalin had risen to power."
   }
  },
  {
   "kind": "books#volume",
   "id": "2qfACwAAQBAJ",
   "etag": "NnR6xGlAaXQ",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/2qfACwAAQBAJ",
   "volumeInfo": {
    "title": "Brave New World",
    "subtitle": "",
    "authors": [
     "Aldous Huxley"
    ],
    "publisher": "Bentang Pustaka",
    "publishedDate": "2016-03-21",
    "description": "Dalam novel Brave New World, Aldous Huxley memperkenalkan sebuah dunia baru: dunia kita, beberapa abad di masa depan. Dunia di mana suatu pemerintahan telah berhasil menelusuri akar ketidakbahagiaan manusia, yang bermuara pada tiga hal: keluarga, seni, dan Tuhan. Demi menanggulanginya, bayi kemudian diciptakan dari dalam botol; melalui proses genetika yang canggih ia dihilangkan dari penyakit, dilepaskan dari kecacatan, untuk kemudian terbebas dari derita besar bernama orang tua. Tumbuh besar, mereka hanya belajar apa yang pemerintah ingin mereka pelajari. Maka seni pun dikebiri, menjadi tak lebih sekadar alat hiburan dan propaganda untuk masyarakat. Sementara sains dijadikan buku resep untuk hidangan industri. Konsumerisme diajarkan sebagai jalan hidup yang utama. Kitab suci diharamkan. Kebahagiaan dipusatkan pada dua sumber utama yakni seks bebas dan candu—konsumsinya dilegalkan dan dipantau ketat oleh pemerintah. Melalui cara-cara inilah perkembangan jiwa manusia berusaha diredam, karena apapun yang merangsang jiwa sesungguhnya adalah benih kegusaran yang pada akhirnya bakal menimbulkan ketidakstabilan masyarakat. Dengan melindungi status quo, maka kebahagiaan hakiki, utopia, dapat diraih. Tidak dengan murah memang, namun sekalinya tercapai, sistem sosial tersebut mustahil diruntuhkan. Sebuah tonggak keberhasilan peradaban manusia di depan alam serta Tuhan penciptanya. [Mizan, Bentang Pustaka, Hidup, Dunia, Tuhan, Bumi, Indonesia]",
    "industryIdentifiers": [
     {
      "type": "ISBN_13",
      "identifier": "9786022910879"
     },
     {
      "type": "ISBN_10",
      "identifier": "6022910870"
     }
    ],
    "readingModes": {
     "text": true,
     "image": true
    },
    "pageCount": 288,
    "printType": "BOOK",
    "categories": [
     "Literary Collections"
    ],
    "averageRating": 3.5,
    "ratingsCount": 2701,
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": true,
    "contentVersion": "1.1.1.0.preview.3",
    "imageLinks": {
     "smallThumbnail": "http://books.google.com/books/content?id=2qfACwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
     "thumbnail": "http://books.google.com/books/content?id=2qfACwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    "language": "id",
    "previewLink": "http://books.google.com/books?id=2qfACwAAQBAJ&printsec=frontcover&dq=Brave+New+World&hl=&cd=3&source=gbs_api",
    "infoLink": "http://books.google.com/books?id=2qfACwAAQBAJ&dq=Brave+New+World&hl=&source=gbs_api",
    "canonicalVolumeLink": "http://books.google.com/books/about/Brave_New_World.html?hl=&id=2qfACwAAQBAJ"
   },
   "saleInfo": {
    "country": "US",
    "saleability": "FOR_SALE",
    "isEbook": true,
    "listPrice": {
     "amount": 2.64,
     "currencyCode": "USD"
    },
    "retailPrice": {
     "amount": 1.98,
     "currencyCode": "USD"
    },
    "buyLink": "http://books.google.com/books?id=2qfACwAAQBAJ&dq=Brave+New+World&hl=&buy=&source=gbs_api",
    "offers": [
     {
      "finskyOfferType": 1,
      "listPrice": {
       "amountInMicros": 2640000.0,
       "currencyCode": "USD"
      },
      "retailPrice": {
       "amountInMicros": 1980000.0,
       "currencyCode": "USD"
      }
     }
    ]
   },
   "accessInfo": {
    "country": "US",
    "viewability": "PARTIAL",
    "embeddable": true,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
     "isAvailable": true,
     "acsTokenLink": "http://books.google.com/books/download/Brave_New_World-sample-epub.acsm?id=2qfACwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
    },
    "pdf": {
     "isAvailable": true,
     "acsTokenLink": "http://books.google.com/books/download/Brave_New_World-sample-pdf.acsm?id=2qfACwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
    },
    "webReaderLink": "http://books.google.com/books/reader?id=2qfACwAAQBAJ&hl=&printsec=frontcover&output=reader&source=gbs_api",
    "accessViewStatus": "SAMPLE",
    "quoteSharingAllowed": false
   },
   "searchInfo": {
    "textSnippet": "Dalam novel Brave New World, Aldous Huxley memperkenalkan sebuah dunia baru: dunia kita, beberapa abad di masa depan."
   }
  },
  {
   "kind": "books#volume",
   "id": "6Ig7PgAACAAJ",
   "etag": "qri3kuHc92k",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/6Ig7PgAACAAJ",
   "volumeInfo": {
    "title": "Brave New World",
    "authors": [
     "Aldous Huxley"
    ],
    "publisher": "Harper Perennial Modern Classics",
    "publishedDate": "2010-01-19",
    "description": "The astonishing novel Brave New World, originally published in 1932, presents Aldous Huxley's legendary vision of a world of tomorrow utterly transformed. In Huxley's darkly satiric yet chillingly prescient imagining of a \"utopian\" future, humans are genetically designed and pharmaceutically anesthetized to passively serve a ruling order. A powerful work of speculative fiction that has enthralled and terrified readers for generations, it remains remarkably relevant to this day as both a warning to be heeded and as a thought-provoking yet satisfying entertainment. This deluxe edition also includes the nonfiction work \"Brave New World Revisited,\" \"a thought-jabbing, terrifying book\" (Chicago Tribune), first published in 1958. It is a fascinating essay in which Huxley compares the modern-day world with his prophetic fantasy envisioned in Brave New World. He scrutinizes threats to humanity such as overpopulation, propaganda, and chemical persuasion, and explains why we have found it virtually impossible to avoid them. With a Foreword by Christopher Hitchens",
    "industryIdentifiers": [
     {
      "type": "ISBN_10",
      "identifier": "0061767646"
     },
     {
      "type": "ISBN_13",
      "identifier": "9780061767647"
     }
    ],
    "readingModes": {
     "text": false,
     "image": false
    },
    "pageCount": 384,
    "printType": "BOOK",
    "categories": [
     "Fiction"
    ],
    "averageRating": 3.5,
    "ratingsCount": 2704,
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": false,
    "contentVersion": "preview-1.0.0",
    "imageLinks": {
     "smallThumbnail": "http://books.google.com/books/content?id=6Ig7PgAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
     "thumbnail": "http://books.google.com/books/content?id=6Ig7PgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com/books?id=6Ig7PgAACAAJ&dq=Brave+New+World&hl=&cd=4&source=gbs_api",
    "infoLink": "http://books.google.com/books?id=6Ig7PgAACAAJ&dq=Brave+New+World&hl=&source=gbs_api",
    "canonicalVolumeLink": "http://books.google.com/books/about/Brave_New_World.html?hl=&id=6Ig7PgAACAAJ"
   },
   "saleInfo": {
    "country": "US",
    "saleability": "NOT_FOR_SALE",
    "isEbook": false
   },
   "accessInfo": {
    "country": "US",
    "viewability": "NO_PAGES",
    "embeddable": false,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
     "isAvailable": false
    },
    "pdf": {
     "isAvailable": false
    },
    "webReaderLink": "http://books.google.com/books/reader?id=6Ig7PgAACAAJ&hl=&printsec=frontcover&output=reader&source=gbs_api",
    "accessViewStatus": "NONE",
    "quoteSharingAllowed": false
   },
   "searchInfo": {
    "textSnippet": "The astonishing novel Brave New World, originally published in 1932, presents Aldous Huxley&#39;s legendary vision of a world of tomorrow utterly transformed."
   }
  },
  {
   "kind": "books#volume",
   "id": "9ebPCgAAQBAJ",
   "etag": "YnquAV2+TJw",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/9ebPCgAAQBAJ",
   "volumeInfo": {
    "title": "This Brave New World",
    "subtitle": "India, China and the United States",
    "authors": [
     "Anja Manuel"
    ],
    "publisher": "Simon and Schuster",
    "publishedDate": "2016-05-10",
    "description": "“Incisive...lively and accessible...Manuel shows us that an optimistic path is possible: we can bring China and India along as partners.” —San Francisco Chronicle In the next decade and a half, China and India will become two of the world’s indispensable powers—whether they rise peacefully or not. During that time, Asia will surpass the combined strength of North America and Europe in economic might, population size, and military spending. Both India and China will have vetoes over many international decisions, from climate change to global trade, human rights, and business standards. From her front row view of this colossal shift, first at the State Department and now as an advisor to American business leaders, Anja Manuel escorts the reader on an intimate tour of the corridors of power in Delhi and Beijing. Her encounters with political and business leaders reveal how each country’s history and politics influences their conduct today. Through vibrant stories, she reveals how each country is working to surmount enormous challenges—from the crushing poverty of Indian slum dwellers and Chinese factory workers, to outrageous corruption scandals, rotting rivers, unbreathable air, and managing their citizens’ discontent. We wring our hands about China, Manuel writes, while we underestimate India, which will be the most important country outside the West to shape China’s rise. Manuel shows us that a different path is possible—we can bring China and India along as partners rather than alienating one or both, and thus extend our own leadership in the world.",
    "industryIdentifiers": [
     {
      "type": "ISBN_13",
      "identifier": "9781501121999"
     },
     {
      "type": "ISBN_10",
      "identifier": "1501121995"
     }
    ],
    "readingModes": {
     "text": true,
     "image": false
    },
    "pageCount": 368,
    "printType": "BOOK",
    "categories": [
     "Political Science"
    ],
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": true,
    "contentVersion": "1.7.7.0.preview.2",
    "imageLinks": {
     "smallThumbnail": "http://books.google.com/books/content?id=9ebPCgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
     "thumbnail": "http://books.google.com/books/content?id=9ebPCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com/books?id=9ebPCgAAQBAJ&printsec=frontcover&dq=Brave+New+World&hl=&cd=5&source=gbs_api",
    "infoLink": "http://books.google.com/books?id=9ebPCgAAQBAJ&dq=Brave+New+World&hl=&source=gbs_api",
    "canonicalVolumeLink": "http://books.google.com/books/about/This_Brave_New_World.html?hl=&id=9ebPCgAAQBAJ"
   },
   "saleInfo": {
    "country": "US",
    "saleability": "FOR_SALE",
    "isEbook": true,
    "listPrice": {
     "amount": 13.99,
     "currencyCode": "USD"
    },
    "retailPrice": {
     "amount": 13.99,
     "currencyCode": "USD"
    },
    "buyLink": "http://books.google.com/books?id=9ebPCgAAQBAJ&dq=Brave+New+World&hl=&buy=&source=gbs_api",
    "offers": [
     {
      "finskyOfferType": 1,
      "listPrice": {
       "amountInMicros": 1.399E7,
       "currencyCode": "USD"
      },
      "retailPrice": {
       "amountInMicros": 1.399E7,
       "currencyCode": "USD"
      }
     }
    ]
   },
   "accessInfo": {
    "country": "US",
    "viewability": "PARTIAL",
    "embeddable": true,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
    "epub": {
     "isAvailable": true,
     "acsTokenLink": "http://books.google.com/books/download/This_Brave_New_World-sample-epub.acsm?id=9ebPCgAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
    },
    "pdf": {
     "isAvailable": false
    },
    "webReaderLink": "http://books.google.com/books/reader?id=9ebPCgAAQBAJ&hl=&printsec=frontcover&output=reader&source=gbs_api",
    "accessViewStatus": "SAMPLE",
    "quoteSharingAllowed": false
   },
   "searchInfo": {
    "textSnippet": "From her front row view of this colossal shift, first at the State Department and now as an advisor to American business leaders, Anja Manuel escorts the reader on an intimate tour of the corridors of power in Delhi and Beijing."
   }
  },
  {
   "kind": "books#volume",
   "id": "c6TzjDsXDF4C",
   "etag": "NPQCbi9Zvqg",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/c6TzjDsXDF4C",
   "volumeInfo": {
    "title": "Brave New World Revisited",
    "authors": [
     "Aldous Huxley"
    ],
    "publisher": "RosettaBooks",
    "publishedDate": "2010-07-01",
    "description": "In 1958, author Aldous Huxley wrote what some would call a sequel to his novel Brave New World (1932) but the sequel did not revisit the story or the characters. Instead, Huxley chose to revisit the world he created in a set of twelve essays in which he meditates on how his fantasy seemed to be becoming a reality and far more quickly than he ever imagined. That Huxley’s book Brave New World had been largely prophetic about a dystopian future a great distress to Huxley. By 1958, Huxley was sixty-four-years old; the world had been transformed by the events of World War II and the terrifying advent of nuclear weapons. Peeking behind the Iron Curtain where people were not free but instead governed by Totalitarianism, Huxley could only bow to grim prophecy of his friend, author George Orwell, (author of the book 1984). It struck Huxley that people were trading their freedom and individualism in exchange for the illusory comfort of sensory pleasure--just as he had predicted in Brave New World. Huxley despairs of contemporary humankind’s willingness to surrender freedom for pleasure. Huxley worried that the rallying cry, “Give me liberty or give me death” could be easily replaced by “Give me television and hamburgers, but don’t bother me with the responsibilities of liberty.” Huxley saw hope in education; education that could teach people to see beyond the easy slogans and efficient ends and anesthetic-like influence of propaganda.",
    "industryIdentifiers": [
     {
      "type": "ISBN_10",
      "identifier": "0795311699"
     },
     {
      "type": "ISBN_13",
      "identifier": "9780795311697"
     }
    ],
    "readingModes": {
     "text": true,
     "image": false
    },
    "pageCount": 144,
    "printType": "BOOK",
    "categories": [
     "Literary Criticism"
    ],
    "averageRating": 3.0,
    "ratingsCount": 5,
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": true,
    "contentVersion": "1.3.2.0.preview.2",
    "imageLinks": {
     "smallThumbnail": "http://books.google.com/books/content?id=c6TzjDsXDF4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
     "thumbnail": "http://books.google.com/books/content?id=c6TzjDsXDF4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com/books?id=c6TzjDsXDF4C&printsec=frontcover&dq=Brave+New+World&hl=&cd=6&source=gbs_api",
    "infoLink": "http://books.google.com/books?id=c6TzjDsXDF4C&dq=Brave+New+World&hl=&source=gbs_api",
    "canonicalVolumeLink": "http://books.google.com/books/about/Brave_New_World_Revisited.html?hl=&id=c6TzjDsXDF4C"
   },
   "saleInfo": {
    "country": "US",
    "saleability": "NOT_FOR_SALE",
    "isEbook": false
   },
   "accessInfo": {
    "country": "US",
    "viewability": "PARTIAL",
    "embeddable": true,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
     "isAvailable": true,
     "acsTokenLink": "http://books.google.com/books/download/Brave_New_World_Revisited-sample-epub.acsm?id=c6TzjDsXDF4C&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
    },
    "pdf": {
     "isAvailable": false
    },
    "webReaderLink": "http://books.google.com/books/reader?id=c6TzjDsXDF4C&hl=&printsec=frontcover&output=reader&source=gbs_api",
    "accessViewStatus": "SAMPLE",
    "quoteSharingAllowed": false
   },
   "searchInfo": {
    "textSnippet": "In 1958, author Aldous Huxley wrote what some would call a sequel to his novel Brave New World (1932) but the sequel did not revisit the story or the characters."
   }
  },
  {
   "kind": "books#volume",
   "id": "3zl4oJMUskoC",
   "etag": "kM0Z2oD3/dk",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/3zl4oJMUskoC",
   "volumeInfo": {
    "title": "Brave New World",
    "authors": [
     "Aldous Huxley"
    ],
    "publisher": "Random House",
    "publishedDate": "2007-01-01",
    "description": "WITH INTRODUCTIONS BY MARGARET ATWOOD AND DAVID BRADSHAW Far in the future, the World Controllers have created the ideal society. Through clever use of genetic engineering, brainwashing and recreational sex and drugs all its members are happy consumers. Bernard Marx seems alone harbouring an ill-defined longing to break free. A visit to one of the few remaining Savage Reservations where the old, imperfect life still continues, may be the cure for his distress... Huxley's ingenious fantasy of the future sheds a blazing light on the present and is considered to be his most enduring masterpiece.",
    "industryIdentifiers": [
     {
      "type": "ISBN_13",
      "identifier": "9780099518471"
     },
     {
      "type": "ISBN_10",
      "identifier": "0099518473"
     }
    ],
    "readingModes": {
     "text": false,
     "image": false
    },
    "pageCount": 229,
    "printType": "BOOK",
    "categories": [
     "Classical fiction"
    ],
    "averageRating": 3.5,
    "ratingsCount": 2702,
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": false,
    "contentVersion": "0.14.1.0.preview.0",
    "imageLinks": {
     "smallThumbnail": "http://books.google.com/books/content?id=3zl4oJMUskoC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
     "thumbnail": "http://books.google.com/books/content?id=3zl4oJMUskoC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com/books?id=3zl4oJMUskoC&dq=Brave+New+World&hl=&cd=7&source=gbs_api",
    "infoLink": "http://books.google.com/books?id=3zl4oJMUskoC&dq=Brave+New+World&hl=&source=gbs_api",
    "canonicalVolumeLink": "http://books.google.com/books/about/Brave_New_World.html?hl=&id=3zl4oJMUskoC"
   },
   "saleInfo": {
    "country": "US",
    "saleability": "NOT_FOR_SALE",
    "isEbook": false
   },
   "accessInfo": {
    "country": "US",
    "viewability": "NO_PAGES",
    "embeddable": false,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
     "isAvailable": false
    },
    "pdf": {
     "isAvailable": false
    },
    "webReaderLink": "http://books.google.com/books/reader?id=3zl4oJMUskoC&hl=&printsec=frontcover&output=reader&source=gbs_api",
    "accessViewStatus": "NONE",
    "quoteSharingAllowed": false
   },
   "searchInfo": {
    "textSnippet": "Huxley&#39;s ingenious fantasy of the future sheds a blazing light on the present and is considered to be his most enduring masterpiece."
   }
  },
  {
   "kind": "books#volume",
   "id": "YZCqGf-D-qYC",
   "etag": "AB94WrK441U",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/YZCqGf-D-qYC",
   "volumeInfo": {
    "title": "Huxley's Brave New World: Essays",
    "subtitle": "Essays",
    "authors": [
     "David Garrett Izzo",
     "Kim Kirkpatrick"
    ],
    "publisher": "McFarland",
    "publishedDate": "2008-05-28",
    "description": "\"These essays reiterate the influence of Brave New World as a literary and philosophical document and describe how Huxley took the events of the world up to 1932 and forecast today's trivialization of society as a path to excess and dictatorship by pacification\"--Provided by publisher.",
    "industryIdentifiers": [
     {
      "type": "ISBN_13",
      "identifier": "9780786480036"
     },
     {
      "type": "ISBN_10",
      "identifier": "0786480033"
     }
    ],
    "readingModes": {
     "text": true,
     "image": true
    },
    "pageCount": 196,
    "printType": "BOOK",
    "categories": [
     "Literary Criticism"
    ],
    "averageRating": 5.0,
    "ratingsCount": 1,
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": true,
    "contentVersion": "0.0.5.0.preview.3",
    "imageLinks": {
     "smallThumbnail": "http://books.google.com/books/content?id=YZCqGf-D-qYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
     "thumbnail": "http://books.google.com/books/content?id=YZCqGf-D-qYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com/books?id=YZCqGf-D-qYC&printsec=frontcover&dq=Brave+New+World&hl=&cd=8&source=gbs_api",
    "infoLink": "http://books.google.com/books?id=YZCqGf-D-qYC&dq=Brave+New+World&hl=&source=gbs_api",
    "canonicalVolumeLink": "http://books.google.com/books/about/Huxley_s_Brave_New_World_Essays.html?hl=&id=YZCqGf-D-qYC"
   },
   "saleInfo": {
    "country": "US",
    "saleability": "FOR_SALE",
    "isEbook": true,
    "listPrice": {
     "amount": 19.99,
     "currencyCode": "USD"
    },
    "retailPrice": {
     "amount": 9.99,
     "currencyCode": "USD"
    },
    "buyLink": "http://books.google.com/books?id=YZCqGf-D-qYC&dq=Brave+New+World&hl=&buy=&source=gbs_api",
    "offers": [
     {
      "finskyOfferType": 1,
      "listPrice": {
       "amountInMicros": 1.999E7,
       "currencyCode": "USD"
      },
      "retailPrice": {
       "amountInMicros": 9990000.0,
       "currencyCode": "USD"
      }
     }
    ]
   },
   "accessInfo": {
    "country": "US",
    "viewability": "PARTIAL",
    "embeddable": true,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
     "isAvailable": true,
     "acsTokenLink": "http://books.google.com/books/download/Huxley_s_Brave_New_World_Essays-sample-epub.acsm?id=YZCqGf-D-qYC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
    },
    "pdf": {
     "isAvailable": true,
     "acsTokenLink": "http://books.google.com/books/download/Huxley_s_Brave_New_World_Essays-sample-pdf.acsm?id=YZCqGf-D-qYC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
    },
    "webReaderLink": "http://books.google.com/books/reader?id=YZCqGf-D-qYC&hl=&printsec=frontcover&output=reader&source=gbs_api",
    "accessViewStatus": "SAMPLE",
    "quoteSharingAllowed": false
   },
   "searchInfo": {
    "textSnippet": "&quot;These essays reiterate the influence of Brave New World as a literary and philosophical document and describe how Huxley took the events of the world up to 1932 and forecast today&#39;s trivialization of society as a path to excess and ..."
   }
  },
  {
   "kind": "books#volume",
   "id": "0yd67t9R51wC",
   "etag": "dPjU8YhpLbE",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/0yd67t9R51wC",
   "volumeInfo": {
    "title": "Oldman's Brave New World of Wine: Pleasure, Value, and Adventure Beyond Wine's Usual Suspects",
    "authors": [
     "Mark Oldman"
    ],
    "publisher": "W. W. Norton & Company",
    "publishedDate": "2010-09-06",
    "description": "PBS wine guru Mark Oldman quenches the universal thirst for the affordable gems coveted by insiders. Weary of buying the same old wines again and again? Wine personality Mark Oldman—known to millions of PBS viewers as a main judge on The Winemakers and winner of the Georges Duboeuf Wine Book of the Year Award—is here to rescue your taste buds with a groundbreaking guide to irresistible wines of moderate cost and maximum appeal. In his signature style that Bon Appétit calls \"wine speak without the geek,\" Oldman uses insightful prose, hilarious anecdotes, and ingenious graphics to reveal the secret wines that everyone wishes they were drinking. Not only does he provide the inside scoop on each wine type's taste, cost, pronunciation, and food affinities, but he details the exclusive picks of more than 130 wine-passionate \"Bravehearts,\" including Tom Colicchio, Guy Fieri, and Jodie Foster. Entertaining like no other, this is a guide for everyone who wants to drink like an insider without breaking the bank.",
    "industryIdentifiers": [
     {
      "type": "ISBN_13",
      "identifier": "9780393339529"
     },
     {
      "type": "ISBN_10",
      "identifier": "0393339521"
     }
    ],
    "readingModes": {
     "text": true,
     "image": false
    },
    "pageCount": 333,
    "printType": "BOOK",
    "categories": [
     "Cooking"
    ],
    "averageRating": 5.0,
    "ratingsCount": 1,
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": false,
    "contentVersion": "0.1.3.0.preview.2",
    "imageLinks": {
     "smallThumbnail": "http://books.google.com/books/content?id=0yd67t9R51wC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
     "thumbnail": "http://books.google.com/books/content?id=0yd67t9R51wC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com/books?id=0yd67t9R51wC&printsec=frontcover&dq=Brave+New+World&hl=&cd=9&source=gbs_api",
    "infoLink": "http://books.google.com/books?id=0yd67t9R51wC&dq=Brave+New+World&hl=&source=gbs_api",
    "canonicalVolumeLink": "http://books.google.com/books/about/Oldman_s_Brave_New_World_of_Wine_Pleasur.html?hl=&id=0yd67t9R51wC"
   },
   "saleInfo": {
    "country": "US",
    "saleability": "FOR_SALE",
    "isEbook": true,
    "listPrice": {
     "amount": 19.95,
     "currencyCode": "USD"
    },
    "retailPrice": {
     "amount": 9.99,
     "currencyCode": "USD"
    },
    "buyLink": "http://books.google.com/books?id=0yd67t9R51wC&dq=Brave+New+World&hl=&buy=&source=gbs_api",
    "offers": [
     {
      "finskyOfferType": 1,
      "listPrice": {
       "amountInMicros": 1.995E7,
       "currencyCode": "USD"
      },
      "retailPrice": {
       "amountInMicros": 9990000.0,
       "currencyCode": "USD"
      }
     }
    ]
   },
   "accessInfo": {
    "country": "US",
    "viewability": "PARTIAL",
    "embeddable": true,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
     "isAvailable": true,
     "acsTokenLink": "http://books.google.com/books/download/Oldman_s_Brave_New_World_of_Wine_Pleasur-sample-epub.acsm?id=0yd67t9R51wC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
    },
    "pdf": {
     "isAvailable": false
    },
    "webReaderLink": "http://books.google.com/books/reader?id=0yd67t9R51wC&hl=&printsec=frontcover&output=reader&source=gbs_api",
    "accessViewStatus": "SAMPLE",
    "quoteSharingAllowed": false
   },
   "searchInfo": {
    "textSnippet": "Presents a guide to moderately-priced wines that are favorably rated and readily available, discussing price, labels, pronunciation, and the types of food that go best with each wine."
   }
  },
  {
   "kind": "books#volume",
   "id": "X4H3oAEACAAJ",
   "etag": "6KFIUz6TP08",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/X4H3oAEACAAJ",
   "volumeInfo": {
    "title": "Brave New World. Aldous Huxley",
    "authors": [
     "H A Cartledge"
    ],
    "publishedDate": "2011-05-01",
    "description": "Contemporary / British English Aldous Huxley's Brave New World is one of the great works of science fiction. It is the year After Ford 632 in the New World. People are born and live by scientific methods. There is worldwide happiness and order. Then John comes from the Savage Reservation to the New World and with him he brings strong emotions - love, hate, anger, fear. Suddenly, danger threatens the New World. Book and MP3 pack.",
    "industryIdentifiers": [
     {
      "type": "ISBN_10",
      "identifier": "1408274353"
     },
     {
      "type": "ISBN_13",
      "identifier": "9781408274354"
     }
    ],
    "readingModes": {
     "text": false,
     "image": false
    },
    "pageCount": 121,
    "printType": "BOOK",
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": false,
    "contentVersion": "preview-1.0.0",
    "imageLinks": {
     "smallThumbnail": "http://books.google.com/books/content?id=X4H3oAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
     "thumbnail": "http://books.google.com/books/content?id=X4H3oAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com/books?id=X4H3oAEACAAJ&dq=Brave+New+World&hl=&cd=10&source=gbs_api",
    "infoLink": "http://books.google.com/books?id=X4H3oAEACAAJ&dq=Brave+New+World&hl=&source=gbs_api",
    "canonicalVolumeLink": "http://books.google.com/books/about/Brave_New_World_Aldous_Huxley.html?hl=&id=X4H3oAEACAAJ"
   },
   "saleInfo": {
    "country": "US",
    "saleability": "NOT_FOR_SALE",
    "isEbook": false
   },
   "accessInfo": {
    "country": "US",
    "viewability": "NO_PAGES",
    "embeddable": false,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
     "isAvailable": false
    },
    "pdf": {
     "isAvailable": false
    },
    "webReaderLink": "http://books.google.com/books/reader?id=X4H3oAEACAAJ&hl=&printsec=frontcover&output=reader&source=gbs_api",
    "accessViewStatus": "NONE",
    "quoteSharingAllowed": false
   },
   "searchInfo": {
    "textSnippet": "Contemporary / British English Aldous Huxley&#39;s Brave New World is one of the great works of science fiction."
   }
  }
 ]
};

const data = googleRes.items.map((item) => {
  return formatAPIData(item.volumeInfo, item.id);
})

const formattedGoogleRes = {
  data: data,
  totalItems: 1059,
  lastOfSet: 10,
  index: 0,
  query: 'Brave New World'
};

export default {
  serverRes,
  googleRes,
  formattedGoogleRes
};
