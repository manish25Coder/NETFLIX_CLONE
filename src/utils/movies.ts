const movies = [
  {
    title: "For Bigger Escape",
    description: "An action-packed escape scene demonstrating cinematic visuals.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscape.mp4",
    thumbnailUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscape.jpg",
    genre: "Action",
    duration: "2 min",
    rating: 6.8,
    mood: "Thrilling, fast-paced",
  },
  {
    title: "For Bigger Fun",
    description: "A fun and energetic short video highlighting vivid colors.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnailUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
    genre: "Comedy",
    duration: "1 min",
    rating: 6.3,
    mood: "Fun, cheerful",
  },
  {
    title: "For Bigger Joyrides",
    description: "High-speed joyrides showcasing action cinematography.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnailUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
    genre: "Action",
    duration: "1 min",
    rating: 6.5,
    mood: "Energetic, thrilling",
  },
  {
    title: "For Bigger Meltdowns",
    description: "A dramatic meltdown sequence highlighting intense moments.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    thumbnailUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
    genre: "Drama",
    duration: "1 min",
    rating: 6.1,
    mood: "Intense, dramatic",
  },
  {
    title: "Subaru Outback On Street And Dirt",
    description: "A realistic car showcase on street and dirt roads.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    thumbnailUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
    genre: "Automobile",
    duration: "2 min",
    rating: 7.1,
    mood: "Adventurous, realistic",
  },
  {
    title: "Volkswagen GTI Review",
    description: "A sleek and stylish car review video.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    thumbnailUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/VolkswagenGTIReview.jpg",
    genre: "Automobile",
    duration: "2 min",
    rating: 7.0,
    mood: "Modern, informative",
  },
  {
    title: "We Are Going On Bullrun",
    description: "A cinematic road trip filled with excitement.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    thumbnailUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WeAreGoingOnBullrun.jpg",
    genre: "Adventure",
    duration: "2 min",
    rating: 7.3,
    mood: "Exciting, adventurous",
  },
  {
    title: "What Car Can You Get For A Grand?",
    description: "An entertaining and budget-friendly car exploration.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    thumbnailUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WhatCarCanYouGetForAGrand.jpg",
    genre: "Lifestyle",
    duration: "2 min",
    rating: 6.9,
    mood: "Informative, casual",
  },


  {
    title: "Sintel (Extended Cut)",
    description: "An extended cinematic version of Sintel.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnailUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
    genre: "Fantasy",
    duration: "14 min",
    rating: 7.4,
    mood: "Epic, emotional",
  },
  {
    title: "Big Buck Bunny (4K)",
    description: "A visually enhanced version of Big Buck Bunny.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    genre: "Animation",
    duration: "10 min",
    rating: 6.4,
    mood: "Playful, uplifting",
  },
  {
    title: "Elephant Dream Redux",
    description: "A surreal and artistic journey inside a machine world.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnailUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    genre: "Experimental",
    duration: "10 min",
    rating: 5.6,
    mood: "Abstract, mysterious",
  },
  {
    title: "Tears of Steel: Reloaded",
    description: "A futuristic battle between man and machine.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnailUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
    genre: "Sci-Fi",
    duration: "12 min",
    rating: 5.5,
    mood: "Dark, futuristic",
  },

];

const recommendationTestOutput = {
  recommendation: [
    {
      title: "Sintel",
      description:
        "A young girl embarks on a quest to find her pet dragon in this action-packed fantasy tale.",
      videoUrl: "https://commv12 min",
      thumbnailUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
      genre: "Fantasy",
      duration: "14 min",
      rating: 7.4,
      _id: "1",
      mood: "",
    },
    {
      title: "Big Buck Bunny",
      description:
        "A large and gentle rabbit takes a stand against bullying in this animated short film.",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnailUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
      genre: "Animation",
      duration: "10 min",
      rating: 6.4,
      _id: "1",
      mood: "",
    },
    {
      title: "For Bigger Blazes",
      description:
        "A dramatic fire scene designed to demonstrate the capabilities of high-resolution video.",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnailUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
      genre: "Action",
      duration: "1 min",
      rating: 6.6,
      _id: "1",
      mood: "",
    },
  ],
  reason:
    "Based on your preferences, I've recommended 'Sintel', 'Big Buck Bunny', and 'For Bigger Blazes'. 'Sintel' is a highly-rated fantasy film that aligns with your 'adventurous' and 'emotional' mood preferences. 'Big Buck Bunny' fits your 'Animation' genre preference and 'playful', 'light-hearted' mood. 'For Bigger Blazes' matches your 'Action' genre preference and 'intense', 'dramatic' mood. I've excluded 'Tears of Steel' and 'Elephant's Dream' as they don't strongly align with your 'adventurous', 'emotional', or 'futuristic' mood preferences. Please note that your minimum rating preference of 12 is not met by any of the movies, and your minimum duration preference of 4 minutes excludes 'For Bigger Blazes' from being a perfect match.",
};

export { recommendationTestOutput };
