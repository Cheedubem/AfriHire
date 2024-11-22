const axios = require("axios");
const cheerio = require("cheerio");

const URL = "https://weworkremotely.com/remote-jobs";

// Main function to scrape job listings
async function scrapeJobs() {
  try {
    // Step 1: Fetch the HTML content using Axios
    const { data } = await axios.get(URL);

    // Step 2: Load HTML content into Cheerio
    const $ = cheerio.load(data);

    // Step 3: Define an array to store the job listings
    const jobs = [];

    // Step 4: Use CSS selectors to extract job details
    $(".job-listing").each((index, element) => {
      const jobTitle = $(element).find(".title").text();
      const company = $(element).find(".company").text();
      const jobLink =
        "https://weworkremotely.com" + $(element).find("a").attr("href");
      const location = $(element).find(".location").text();

      // Step 5: Filter for remote or worldwide jobs
      if (
        location.toLowerCase().includes("remote") ||
        location.toLowerCase().includes("worldwide")
      ) {
        jobs.push({ jobTitle, company, jobLink, location });
      }
    });

    // Step 6: Log the results to the console
    console.log(jobs);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

// Run the scraper function
scrapeJobs();
