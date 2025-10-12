// Q1. Perform text search on title and content fields and output title,content,score - sorted using score
// send title,content and score as response
const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
});

// TODO: Create text index on title and content
articleSchema.index({ title: "text", content: "text" }); // <- Student will fill this

const Article = mongoose.model("Article", articleSchema);

// TODO: Implement search route
app.get("/articles/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ message: "Missing search query" });
  }
  const releventArticles = await Article.find(
    // do a text search on those fields that have text index (here title and content)
    { $text: { $search: query } },
    // projection object - new field called score and scoring is calculated using meta operator
    // include title, content and score only - projection obj defines what fields to return in the doc
    { title: 1, content: 1, score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" } }); // sort with the projection object

  res.json(releventArticles);
});

//-----------------------------------------------------------------------------------------------------------------

// Q2. Total salary and top 3 salaries in each department
const employeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  salary: Number,
});

const Employee = mongoose.model("Employee", employeeSchema);

// TODO: GET /salary/summary
app.get("/salary/summary", async (req, res) => {
  // Implement aggregation to return totalSalary per department
  try {
    const data = await Employee.aggregate([
      // $field_name is a ref to the field in original doc, otherwise its interpreted as
      // literal string - which won't work as it doesn't mean anything
      { $group: { _id: "$department", totalSalary: { $sum: "$salary" } } }, // stage 1
      // stage 1 will give smth like - {"_id": "Engineering", "totalSalary":350000}
      { $project: { _id: 0, department: "$_id", totalSalary: 1 } }, // stage 2
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// TODO: GET /salary/top3
app.get("/salary/top3", async (req, res) => {
  // Implement aggregation to return top 3 highest salaries per department
  try {
    const data = await Employee.aggregate([
      { $sort: { salary: -1 } },
      {
        $group: {
          _id: "$department",
          topSalaries: { $push: { name: "$name", salary: "$salary" } },
        },
      },
      {
        $project: {
          _id: 0,
          department: "$_id",
          topSalaries: { $slice: ["$topSalaries", 3] },
        },
      },
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//-----------------------------------------------------------------------------------------------------------------

// Q3. Find longest palindromic substring in a DNA sequence (a string) send in req body
// TODO: Implement POST /dna/palindrome endpoint
function checkPali(s, i, j) {
  if (i >= j) return true;
  if (s[i] !== s[j]) return false;
  return checkPali(s, i + 1, j - 1);
}

app.post("/dna/palindrome", (req, res) => {
  try {
    const { sequence } = req.body;
    if (!sequence || sequence === " ") {
      res.status(400).json({ message: "Sequence is required" });
    }
    n = sequence.length;
    maxLen = 0;
    startIndex = 0;
    for (let i = 0; i < n; i++) {
      for (let j = i; j < n; j++) {
        if (checkPali(sequence, i, j)) {
          len = j - i + 1;
          if (len > maxLen) {
            maxLen = len;
            startIndex = i;
          }
        }
      }
    }
    LongestSubSeq = sequence.substring(startIndex, startIndex + maxLen);
    res.status(200).json({ longestPalindrome: LongestSubSeq });
  } catch (error) {
    req.statusCode(500).json({ error: error.message });
  }
});

//---------------------------------------------------------------------------------------------------------------

// Q4. Shortlist good candidates - only return details of those candidates who have the minExperience
// required for the job and has all the required skills
app.post("/hr/shortlist", (req, res) => {
  // Student will implement logic here
  try {
    const { minExperience, requiredSkills, candidates } = req.body;
    if (!minExperience || !requiredSkills || !candidates) {
      res.status(400).json({ message: "Invalid input" });
    }
    const goodCandidates = candidates.filter((person) => {
      if (person.experience < minExperience) {
        return false;
      }
      return requiredSkills.every((skill) => person.skills.includes(skill));
    });
    res.json({ shortlisted: goodCandidates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Q5. Handle Lok Sabha elections - allow addition of MP, cast a vote and get results. Also handle errors
// In-memory arrays for MPs and votes
const mps = [];
const votes = [];

let currentId = 1;

// TODO: Implement the following endpoints:
// - POST /mp
// - POST /vote
// - GET /results
app.post("/mp", (req, res) => {
  try {
    const { name, constituency } = req.body;
    if (!name || !constituency) {
      return res
        .status(400)
        .json({ message: "Name and constituency are required" });
    }
    newMP = { id: currentId++, name: name, constituency: constituency };
    mps.push(newMP);
    res.status(201).json(newMP);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/vote", (req, res) => {
  try {
    const { mpId, vote } = req.body;
    if (!mpId || !vote) {
      return res.status(400).json({ message: "mpId and vote are required" });
    }
    validVotes = ["yes", "no", "abstain"];
    if (!validVotes.includes(vote)) {
      return res.status(400).json({ message: "Invalid vote value" });
    }
    if (!mps.find((mp) => mp.id === mpId)) {
      return res.status(404).json({ message: "Invalid MP ID" });
    }
    if (votes.find((vote) => vote.mpId === mpId)) {
      return res.status(409).json({ message: "MP has already voted" });
    }
    newVote = { mpId: mpId, vote: vote };
    votes.push(newVote)
    res.status(200).json({ message: "Vote recorded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/results", (req, res) => {
  try {
    let yesCnt = 0;
    let noCnt = 0;
    let abstainCnt = 0;
    votes.map((vote) => {
      if (vote.vote === "yes") {
        yesCnt++;
      } else if (vote.vote === "no") {
        noCnt++;
      } else {
        abstainCnt++;
      }
    });
    cntTally = { yes: yesCnt, no: noCnt, abstain: abstainCnt };
    res.status(200).json(cntTally);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




