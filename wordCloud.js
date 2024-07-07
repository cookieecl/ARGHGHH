// Constructor function for WordCloud visualization
function WordCloud() {
    // Setup any initialization logic here
    this.id = 'wordcloud'; // Unique ID for the visualization
    this.name = 'Word Cloud'; // Display name in the gallery menu
    // Add any other properties needed
    this.words = []; // Array to store word cloud data
    this.loaded = false; // Flag to track if data is loaded
  
    // Method to load CSV data for the word cloud (from file)
    this.loadData = function() {
      var self = this;
      // Load CSV file using p5.js loadTable function
      var csvPath = './data/wordcloud/best_selling_books_2.csv';
      this.table = loadTable(csvPath, 'csv', 'header', function(table) {
        self.createWordCloud(table);
      });
    };
  
    // Method to create the word cloud layout using p5.js
    this.createWordCloud = function(table) {
      var words = [];
  
      // Convert table data to words array
      for (var i = 0; i < table.getRowCount(); i++) {
        var title = table.getString(i, 'Title');
        var volumeSales = parseFloat(table.getString(i, 'Volume Sales'));
        words.push({ text: title, size: 20 + Math.random() * 40 }); // Adjusted size range
      }
  
      // Sort words by size (volume sales)
      words.sort(function(a, b) {
        return b.size - a.size;
      });
  
      // Store words data
      this.words = words;
      this.loaded = true; // Mark data as loaded
    };
  
    // Method to setup the visualization
    this.setup = function() {
      // Load data and create the word cloud
      this.loadData();
    };
  
    // Optional method for cleanup if needed
    this.destroy = function() {
      // Clear canvas or perform other cleanup
      clear();
    };
  
    // Method to draw the visualization
    this.draw = function() {
      // Ensure words are loaded before rendering the word cloud
      if (!this.loaded) {
        // Display loading message or handle accordingly
        textAlign(CENTER, CENTER);
        textSize(20);
        text('Loading...', width / 2, height / 2);
        return;
      }
  
      // Use p5.js to draw word cloud
      background(255);
  
      var maxSize = this.words.reduce((max, word) => Math.max(max, word.size), 0); // Max size for scaling
      var baseFontSize = 20; // Base font size
  
      this.words.forEach(function(word) {
        var fontSize = baseFontSize + (word.size / maxSize) * 40; // Scale font size based on size attribute
        textSize(fontSize);
        textAlign(CENTER, CENTER);
        fill(random(255), random(255), random(255)); // Random color fill
        text(word.text, random(width), random(height)); // Randomize position for effect
      });
    };
  }
  