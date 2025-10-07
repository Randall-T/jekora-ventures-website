// ============================================
// BLOG SYSTEM - blog.js
// ============================================

const blogPosts = [
  {
    id: 1,
    title: "iHAV Foundation Visit Jekora Ventures Ga-Mashie Compost Plant",
    slug: "ihav-foundation-visit-jekora-ventures-ga-mashie-compost-plant",
    excerpt:
      "Forty-five young entrepreneurs from nine African countries (Ghana, Nigeria, Botswana, Zimbabwe, Guinea, Kenya, Cameroon, Gambia and Benin) visited the Jekora...",
    author: "Jeko",
    date: "2016-02-10",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/ihav-foundation-visit-jekora-ventures-ga-mashie-compost-plant.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 2,
    title:
      "National Waste Segregation Program: Jekora Ventures and EPA Collaborate",
    slug: "national-waste-segregation-program-jekora-ventures-and-epa-collaborate",
    excerpt:
      "On the 22nd of November, the Ghana Environmental Protection Agency (EPA), under the Ministry of Environment, Science, Technology and Innovation launched the ...",
    author: "Jeko",
    date: "2016-02-10",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/national-waste-segregation-program-jekora-ventures-and-epa-collaborate.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 3,
    title: "Movenpick Donation",
    slug: "movenpick-donation",
    excerpt:
      "On the 13th of October, Jekora Ventures donated six 240 liter refuse bins to the Movenpick Hotel.  This gesture was in line with our continuous relationship ...",
    author: "Jeko",
    date: "2016-02-10",
    category: "news",
    tags: ["blog"],
    image: "../assets/images/blog/movenpick-donation.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 4,
    title:
      "Address From the Managing Director (JVL) at the Launch of the Mayor's Waste Segregation Initiative",
    slug: "address-from-the-managing-director-jvl-at-the-launch-of-the-mayors-waste-segregation-initiative",
    excerpt:
      "Segregation of waste is at the heart of the operations of Jekora Ventures Limited.  We are very pleased to partner with the Accra Metropolitan Assembly on th...",
    author: "randal",
    date: "2017-09-19",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/address-from-the-managing-director-jvl-at-the-launch-of-the-mayors-waste-segregation-initiative.jpg",
    featured: false,
    readTime: 3,
  },
  {
    id: 5,
    title: "Meet The New Director General of IWMI",
    slug: "meet-the-new-director-general-of-iwmi",
    excerpt:
      "It was a privilege to welcome Dr.  Claudia Sadoff, the new International Water Management Institute’s (IWMI) Director General (DG), at our JVL Fortifer Compo...",
    author: "randal",
    date: "2018-03-26",
    category: "news",
    tags: ["blog"],
    image: "../assets/images/blog/meet-the-new-director-general-of-iwmi.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 6,
    title:
      "WACEE 2017: “Renewable Energy and Environmental Technologies in the Context of Sustainable Development: Future Challenges and Directions”",
    slug: "wacee-2017-renewable-energy-and-environmental-technologies-in-the-context-of-sustainable-development-future-challenges-and-directions",
    excerpt:
      "Kindly find below the presentations of the 6th West African Clean Energy & Environment Exhibition & Conference (WACEE 2017) dubbed: “Renewable Energy and Env...",
    author: "randal",
    date: "2017-12-06",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/wacee-2017-renewable-energy-and-environmental-technologies-in-the-context-of-sustainable-development-future-challenges-and-directions.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 7,
    title: "Supporting Local Waste Management Companies to Grow",
    slug: "supporting-local-waste-management-companies-to-grow",
    excerpt:
      "An Analysis of the Current Situation Environmental sanitation is undeniably one of the most powerful drivers of quality of life, with respect to health and w...",
    author: "randal",
    date: "2014-08-16",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/supporting-local-waste-management-companies-to-grow.jpg",
    featured: false,
    readTime: 6,
  },
  {
    id: 8,
    title: "Niagara Hotel Manager Prosecuted Over Waste Issues",
    slug: "niagara-hotel-manager-prosecuted-over-waste-issues",
    excerpt:
      "The Motor and Sanitation Court at Abeka presided over by Her Lordship Felicia Gandedze, on Friday fined Mr Ali Mohammed, Manager of the Niagara Hotel GHC 840...",
    author: "randal",
    date: "2015-08-26",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/niagara-hotel-manager-prosecuted-over-waste-issues.jpg",
    featured: false,
    readTime: 2,
  },
  {
    id: 9,
    title: "Management contract Jekora Ventures Ltd.",
    slug: "management-contract-jekora-ventures-ltd",
    excerpt:
      "Jekora Ventures Ltd and Safi Sana Ghana Ltd signed the management contract for the operation of the public toilet in Teshie.  Jekora Ventures Ltd is an estab...",
    author: "randal",
    date: "2011-10-10",
    category: "news",
    tags: ["blog"],
    image: "../assets/images/blog/management-contract-jekora-ventures-ltd.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 10,
    title: "Why is Your Country so Dirty? Because Your Government is so Cheap!",
    slug: "why-is-your-country-so-dirty-because-your-government-is-so-cheap",
    excerpt:
      "In this season of political manifestos and party election slogans, one might wonder if we have time to think about our environment.  Of course we do",
    author: "randal",
    date: "2012-10-23",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/why-is-your-country-so-dirty-because-your-government-is-so-cheap.jpg",
    featured: false,
    readTime: 4,
  },
  {
    id: 11,
    title: "Ghana Launches Waste Segregation Project",
    slug: "ghana-launches-waste-segregation-project",
    excerpt:
      "The Ministry of Environment, Science, Technology and Innovation, in collaboration with the Environmental Protection Agency (EPA) and Zoomlion, have launched ...",
    author: "randal",
    date: "2013-12-03",
    category: "news",
    tags: ["blog"],
    image: "../assets/images/blog/ghana-launches-waste-segregation-project.jpg",
    featured: false,
    readTime: 3,
  },
  {
    id: 12,
    title: "WACEE'15: No waste to waste - Productive Use of Biomass",
    slug: "wacee15-no-waste-to-waste-productive-use-of-biomass",
    excerpt:
      "Jekora's Presentation: Potentials of high quality composting in Ghana Presented by: Akua Poh Nkrumah, Jekora Ventures Ltd.  Download Source",
    author: "randal",
    date: "2015-02-12",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/wacee15-no-waste-to-waste-productive-use-of-biomass.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 13,
    title: "RRR Business Model Testing in West Africa",
    slug: "rrr-business-model-testing-in-west-africa",
    excerpt:
      "To close the nutrient cycle which is an important regulatory ESS, the project will enhance safe use of excreta in agriculture which will also help to generat...",
    author: "randal",
    date: "2015-12-02",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/rrr-business-model-testing-in-west-africa.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 14,
    title:
      "JEKORA VENTURES LTD (JVL) SHARES PUBLIC-PRIVATE PARTNERSHIP (PPP) EXPERIENCE IN PROVIDING IMPROVED SANITATION IN GHANA TO THE WORLD",
    slug: "jekora-ventures-ltd-jvl-shares-public-private-partnership-ppp-experience-in-providing-improved-sanitation-in-ghana-to-the-world",
    excerpt:
      "In the city of Blantyre, Malawi saw the convening of cities/countries from the 4th – 6th of December, 2017 that have benefited from joint grants from Bill & ...",
    author: "randal",
    date: "2017-12-08",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/jekora-ventures-ltd-jvl-shares-public-private-partnership-ppp-experience-in-providing-improved-sanitation-in-ghana-to-the-world.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 15,
    title: "Government to Implement ‘Zero Landfill Policy’",
    slug: "government-to-implement-zero-landfill-policy",
    excerpt:
      "Government is to implement a ‘zero landfill policy’ as part of measures to recycle and convert the country’s waste into other bye products.  Ghana is faced w...",
    author: "randal",
    date: "2018-07-03",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/government-to-implement-zero-landfill-policy.jpg",
    featured: false,
    readTime: 3,
  },
  {
    id: 16,
    title:
      "Inauguration of Board of Directors for the JVL Fortifer Compost Plant",
    slug: "inauguration-of-board-of-directors-for-the-jvl-fortifer-compost-plant",
    excerpt:
      "A ceremony was held on July 3, 2018 at the JVL Fortifer Compost plant premises to inaugurate a seven (7)-member Board of Directors for the plant.  The board ...",
    author: "randal",
    date: "2018-07-04",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/inauguration-of-board-of-directors-for-the-jvl-fortifer-compost-plant.jpg",
    featured: false,
    readTime: 2,
  },
  {
    id: 17,
    title:
      "Learning Tour of JVL Fortifer Compost Plant by Metropolitan, Municipal and District Assemblies (MMDAS)",
    slug: "learning-tour-of-jvl-fortifer-compost-plant-by-metropolitan-municipal-and-district-assemblies-mmdas",
    excerpt:
      '[gallery ids="1447,1448,1449,1450,1451,1452,1453,1454,1455,1456,1457,1458,1459,1460,1461,1462,1463,1464,1465,1466,1467,1468,1469,1470"] About 35 delegates fr...',
    author: "randal",
    date: "2018-07-27",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/learning-tour-of-jvl-fortifer-compost-plant-by-metropolitan-municipal-and-district-assemblies-mmdas.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 18,
    title: "Let's Promote City to City Relations in Africa",
    slug: "lets-promote-city-to-city-relations-in-africa",
    excerpt:
      "The Metropolitan Chief Executive (MCE) of the Accra Metropolitan Assembly (AMA), Mr.  Mohammed Adjei Sowah, has reiterated the need for Africans to promote c...",
    author: "randal",
    date: "2018-08-14",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/lets-promote-city-to-city-relations-in-africa.jpg",
    featured: false,
    readTime: 2,
  },
  {
    id: 19,
    title: "Alarming Theft of Public Litter Bins in Accra",
    slug: "alarming-theft-of-public-litter-bins-in-accra",
    excerpt:
      "The rate at which public litter bins placed at vantage points in the capital are being stolen is thwarting efforts by public-spirited individuals, civil soci...",
    author: "randal",
    date: "2018-10-01",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/alarming-theft-of-public-litter-bins-in-accra.jpg",
    featured: false,
    readTime: 3,
  },
  {
    id: 20,
    title: "Can a Waste Audit Help Your Business?",
    slug: "can-a-waste-audit-help-your-business",
    excerpt: "By: Martha A.  Annan, Innovations Manager",
    author: "randal",
    date: "2018-10-05",
    category: "news",
    tags: ["blog"],
    image: "../assets/images/blog/can-a-waste-audit-help-your-business.jpg",
    featured: false,
    readTime: 2,
  },
  {
    id: 21,
    title: "JVL Participates in the 4th Ghana Renewable Energy Fair",
    slug: "jvl-participates-in-the-4th-ghana-renewable-energy-fair",
    excerpt:
      "Jekora Ventures Limited (JVL), the waste management professionals is participating in the ongoing 4th Ghana Renewable Energy Fair (RE Fair) at the Accra Inte...",
    author: "randal",
    date: "2018-10-12",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/jvl-participates-in-the-4th-ghana-renewable-energy-fair.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 22,
    title: "The Accra SDG’s Investment Fair",
    slug: "the-accra-sdgs-investment-fair",
    excerpt:
      "The Sustainable Development Goals (SDG’s) provide a dynamic framework for Ghana’s transformation.  Jekora Ventures Limited has positioned itself to achieve 9...",
    author: "randal",
    date: "2018-12-05",
    category: "news",
    tags: ["blog"],
    image: "../assets/images/blog/the-accra-sdgs-investment-fair.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 23,
    title: "AMA Releases Performance Report for Waste Management Companies",
    slug: "ama-releases-performance-report-for-waste-management-companies",
    excerpt:
      "The Accra Metropolitan Assembly (AMA) has released a report on the performance of the various waste management companies operating in the metropolis for the ...",
    author: "randal",
    date: "2019-03-21",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/ama-releases-performance-report-for-waste-management-companies.jpg",
    featured: false,
    readTime: 3,
  },
  {
    id: 24,
    title: "Delegation From City of Paris Visits Jekora Ventures Limited",
    slug: "delegation-from-city-of-paris-visits-jekora-ventures-limited",
    excerpt:
      "A delegation from Marie de Paris, France, paid a working visit to Accra Metropolitan Assembly from the 20th to 25th May 2019 to exploit areas of possible co-...",
    author: "randal",
    date: "2019-05-26",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/delegation-from-city-of-paris-visits-jekora-ventures-limited.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 25,
    title:
      "The Methodist Church of Ghana, Gethsemane Society, Baatsona, Starts Segregation At Source!",
    slug: "the-methodist-church-of-ghana-gethsemane-society-baatsona-starts-segregation-at-source",
    excerpt:
      "Due to the immense benefits of segregating at source, the Methodist Church of Ghana, Gethsemane Society, Baatsona, has joined the increasing number of church...",
    author: "randal",
    date: "2019-06-21",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/the-methodist-church-of-ghana-gethsemane-society-baatsona-starts-segregation-at-source.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 26,
    title:
      "JVL Supports NCCE Citizenship Week Celebration With 200 Customized Shirts",
    slug: "jvl-supports-ncce-citizenship-week-celebration-with-200-customized-shirts",
    excerpt:
      "“The most obvious challenge in the country is improper waste management.  Accra is full of filth",
    author: "randal",
    date: "2019-07-02",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/jvl-supports-ncce-citizenship-week-celebration-with-200-customized-shirts.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 27,
    title: "BISHOP BOWERS SCHOOL VISITS THE GA-MASHIE AEROBIC COMPOST FACILITY",
    slug: "bishop-bowers-school-visits-the-ga-mashie-aerobic-compost-facility",
    excerpt:
      "On Friday, June 14, 2019, a total on seventy-three (73) people – composed of six (6) staff members and sixty-seven (67) JHS 2 students from the Bishop Bowers...",
    author: "randal",
    date: "2019-06-21",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/bishop-bowers-school-visits-the-ga-mashie-aerobic-compost-facility.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 28,
    title:
      "SOD–CUTTING CEREMONY ON THE COMMENCEMENT OF THE CONSTRUCTION OF ORGANIC FERTILIZER AND BRIQUETTE PLANT IN THE YILO-KROBO MUNICIPAL ASSEMBLY, GHANA",
    slug: "sodcutting-ceremony-on-the-commencement-of-the-construction-of-organic-fertilizer-and-briquette-plant-in-the-yilo-krobo-municipal-assembly-ghana",
    excerpt:
      "The construction of a fertiliser production factory under the one district one factory has commenced in Somanya in the Yilo Krobo Municipality, to process bo...",
    author: "randal",
    date: "2019-08-30",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/sodcutting-ceremony-on-the-commencement-of-the-construction-of-organic-fertilizer-and-briquette-plant-in-the-yilo-krobo-municipal-assembly-ghana.jpg",
    featured: false,
    readTime: 3,
  },
  {
    id: 29,
    title:
      "Logistics Support to the Head of Civil Service as Part of their Week &amp; Awards Celebration",
    slug: "logistics-support-to-the-head-of-civil-service-as-part-of-their-week-amp-awards-celebration",
    excerpt:
      "Jekora Ventures Limited a leading integrated waste management and resource recovery company, gave support in the form of logistics to the head of civil servi...",
    author: "Excel",
    date: "2019-11-17",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/logistics-support-to-the-head-of-civil-service-as-part-of-their-week-amp-awards-celebration.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 30,
    title:
      "After the flush: How a project in Ghana is turning human waste into an economic resource",
    slug: "after-the-flush-how-a-project-in-ghana-is-turning-human-waste-into-an-economic-resource",
    excerpt:
      "November 17, 2020 United Nations’ Sustainable Development Goal 6 aims to ensure clean water and sanitation for all.  The two are closely interconnected: a la...",
    author: "Excel",
    date: "2020-11-17",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/after-the-flush-how-a-project-in-ghana-is-turning-human-waste-into-an-economic-resource.jpg",
    featured: false,
    readTime: 4,
  },
  {
    id: 31,
    title:
      "2021 SEED Low Carbon Award Winner, JVL-YKMA Recycling Plant, Compost and briquettes production for food, energy and cleaner environment.",
    slug: "2021-seed-low-carbon-award-winner-jvl-ykma-recycling-plant-compost-and-briquettes-production-for-food-energy-and-cleaner-environment",
    excerpt:
      "The JVL-YKMA recycling plant set up is an innovative Public-Private Partnership between Jekora Ventures Ltd (JVL) and the Yilo Krobo Municipal Assembly (YKMA...",
    author: "Excel",
    date: "2021-07-09",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/2021-seed-low-carbon-award-winner-jvl-ykma-recycling-plant-compost-and-briquettes-production-for-food-energy-and-cleaner-environment.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 32,
    title:
      "JEKORA VENTURES CLEARS REFUSE AT ADENTA SSNIT FLATS … AS IT DEMONSTRATES ITS CORPORATE VALUES",
    slug: "jekora-ventures-clears-refuse-at-adenta-ssnit-flats-as-it-demonstrates-its-corporate-values",
    excerpt:
      "Waste Management Company, Jekora Ventures has cleared piled up refuse at the Adenta SSNIT Flats in the Adenta Municipality in the Greater Accra Region follow...",
    author: "Excel",
    date: "2021-11-08",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/jekora-ventures-clears-refuse-at-adenta-ssnit-flats-as-it-demonstrates-its-corporate-values.jpg",
    featured: false,
    readTime: 1,
  },
  {
    id: 33,
    title: "Extend Covid-19 relief support to us – Waste Mgt firm to govt",
    slug: "extend-covid-19-relief-support-to-us-waste-mgt-firm-to-govt",
    excerpt:
      "The Impact of Covid-19 has been dire on many businesses in Ghana.  Waste Management Companies have not been insulated from the negative effect of the pandemi...",
    author: "Excel",
    date: "2020-08-13",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/extend-covid-19-relief-support-to-us-waste-mgt-firm-to-govt.jpg",
    featured: false,
    readTime: 2,
  },
  {
    id: 34,
    title:
      "3 Entrepreneurs in South Africa, Ghana, &amp; Uganda Beat over 1,000 Applicants to Win Prestigious award",
    slug: "3-entrepreneurs-in-south-africa-ghana-amp-uganda-beat-over-1000-applicants-to-win-prestigious-award",
    excerpt:
      "A business which gives out virtual cash in exchange for rubbish, a start-up which converts faecal sludge into fuel briquettes, and an enterprise which offers...",
    author: "Excel",
    date: "2021-07-14",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/3-entrepreneurs-in-south-africa-ghana-amp-uganda-beat-over-1000-applicants-to-win-prestigious-award.jpg",
    featured: false,
    readTime: 5,
  },
  {
    id: 35,
    title: "Meet the SEED Awards 2021 Winners and Runners-up",
    slug: "meet-the-seed-awards-2021-winners-and-runners-up",
    excerpt:
      "SEED announced the winners of the SEED Awards for Entrepreneurship in Sustainable Development (SEED Awards), at the UN’s High-level Political Forum on Sustai...",
    author: "Excel",
    date: "2021-07-13",
    category: "news",
    tags: ["blog"],
    image:
      "../assets/images/blog/meet-the-seed-awards-2021-winners-and-runners-up.jpg",
    featured: false,
    readTime: 5,
  },
  {
    id: 36,
    title: "Waste Not, Want Not",
    slug: "waste-not-want-not",
    excerpt:
      "Waste Not, Want Not “When I think of sustainable waste management in Ghana, one question comes to mind: how do we apply general scientific and entrepreneuria...",
    author: "Excel",
    date: "2021-12-17",
    category: "news",
    tags: ["blog"],
    image: "../assets/images/blog/waste-not-want-not.jpg",
    featured: false,
    readTime: 2,
  },
];

// ============================================
// BLOG RENDERING FUNCTIONS
// ============================================

class BlogManager {
  constructor(posts) {
    this.allPosts = posts;
    this.filteredPosts = posts;
    this.currentCategory = "all";
    this.searchTerm = "";

    this.container = document.getElementById("blog-posts-container");
    this.noResults = document.getElementById("no-results");
    this.loadingState = document.getElementById("loading-state");
    this.searchInput = document.getElementById("search-input");
    this.filterButtons = document.querySelectorAll(".filter-btn");
  }

  init() {
    // Sort posts by date (newest first)
    this.allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Initial render
    this.renderPosts();

    // Setup event listeners
    this.setupEventListeners();

    // Hide loading state
    if (this.loadingState) {
      this.loadingState.style.display = "none";
    }
  }

  setupEventListeners() {
    // Category filters
    this.filterButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const category = e.target.dataset.category;
        this.filterByCategory(category);

        // Update active button
        this.filterButtons.forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");
      });
    });

    // Search input
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        this.searchTerm = e.target.value.toLowerCase();
        this.applyFilters();
      });
    }
  }

  filterByCategory(category) {
    this.currentCategory = category;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredPosts = this.allPosts.filter((post) => {
      // Category filter
      const matchesCategory =
        this.currentCategory === "all" ||
        post.category === this.currentCategory;

      // Search filter
      const matchesSearch =
        this.searchTerm === "" ||
        post.title.toLowerCase().includes(this.searchTerm) ||
        post.excerpt.toLowerCase().includes(this.searchTerm) ||
        post.tags.some((tag) => tag.toLowerCase().includes(this.searchTerm));

      return matchesCategory && matchesSearch;
    });

    this.renderPosts();
  }

  renderPosts() {
    if (!this.container) return;

    // Clear container
    this.container.innerHTML = "";

    // Show/hide no results message
    if (this.filteredPosts.length === 0) {
      this.noResults.classList.remove("hidden");
      return;
    } else {
      this.noResults.classList.add("hidden");
    }

    // Render posts
    this.filteredPosts.forEach((post) => {
      const postCard = this.createPostCard(post);
      this.container.appendChild(postCard);
    });
  }

  createPostCard(post) {
    const card = document.createElement("article");
    card.className =
      "blog-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col";

    const categoryColors = {
      sustainability: "bg-green-500",
      recycling: "bg-blue-500",
      community: "bg-purple-500",
      innovation: "bg-red-500",
      news: "bg-amber-500",
    };

    const categoryColor = categoryColors[post.category] || "bg-gray-500";
    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    card.innerHTML = `
            <div class="relative h-48 overflow-hidden">
                <img 
                    src="${post.image}" 
                    alt="${post.title}"
                    class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onerror="this.src='../assets/images/placeholder-blog.jpg'"
                >
                ${
                  post.featured
                    ? '<span class="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Featured</span>'
                    : ""
                }
                <span class="absolute bottom-4 right-4 ${categoryColor} text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
                    ${post.category}
                </span>
            </div>
            <div class="p-6 flex-1 flex flex-col">
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <time datetime="${post.date}">${formattedDate}</time>
                    <span class="mx-2">•</span>
                    <span>${post.author}</span>
                </div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    ${post.title}
                </h2>
                <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-1">
                    ${post.excerpt}
                </p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${post.tags
                      .slice(0, 3)
                      .map(
                        (tag) =>
                          `<span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">#${tag}</span>`
                      )
                      .join("")}
                </div>
                <a 
                    href="posts/${post.slug}.html" 
                    class="btn-primary inline-block text-center mt-auto"
                >
                    Read More
                    <svg class="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </a>
            </div>
        `;

    return card;
  }

  // Method to load posts from external JSON file (future enhancement)
  async loadPostsFromJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to load posts");
      const posts = await response.json();
      this.allPosts = posts;
      this.filteredPosts = posts;
      this.init();
    } catch (error) {
      console.error("Error loading blog posts:", error);
      this.container.innerHTML = `
                <div class="col-span-full text-center py-16">
                    <p class="text-red-500 dark:text-red-400">Failed to load blog posts. Please try again later.</p>
                </div>
            `;
    }
  }
}

// ============================================
// INITIALIZE BLOG
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Wait for components to load
  setTimeout(() => {
    const blogManager = new BlogManager(blogPosts);
    blogManager.init();
    console.log("✅ Blog system initialized");
  }, 500);
});
