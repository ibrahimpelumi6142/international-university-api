/**
 * WorqNow Education API - JavaScript Example
 * Basic usage with fetch API
 */

// Get all Australian universities
async function getAllUniversities() {
  try {
    const response = await fetch('https://api.worqnow.ai/education/au/universities');
    const data = await response.json();
    
    console.log(`Found ${data.count} universities`);
    
    data.data.forEach(uni => {
      console.log(`- ${uni.name} (${uni.region})`);
    });
    
    return data.data;
  } catch (error) {
    console.error('Error fetching universities:', error);
  }
}

// Get universities with filters
async function getFilteredUniversities() {
  try {
    const params = new URLSearchParams({
      is_regional: 'true',
      has_scholarship: 'true',
      limit: '10'
    });
    
    const response = await fetch(`https://api.worqnow.ai/education/au/universities?${params}`);
    const data = await response.json();
    
    console.log(`Found ${data.count} regional universities with scholarships`);
    
    data.data.forEach(uni => {
      console.log(`\n${uni.name}`);
      console.log(`Region: ${uni.region}`);
      console.log(`Scholarships: ${uni.scholarships.length}`);
    });
    
    return data.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Get scholarships for a specific country
async function getScholarships(country = 'au') {
  try {
    const response = await fetch(`https://api.worqnow.ai/education/${country}/scholarships`);
    const data = await response.json();
    
    console.log(`Found ${data.count} universities with scholarship programs`);
    
    let totalScholarships = 0;
    data.data.forEach(uni => {
      totalScholarships += uni.scholarships.length;
      console.log(`\n${uni.university_code}:`);
      uni.scholarships.forEach(scholarship => {
        console.log(`  - ${scholarship.name}: ${scholarship.value}`);
      });
    });
    
    console.log(`\nTotal scholarships: ${totalScholarships}`);
    return data.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Get statistics for a country
async function getStatistics(country = 'au') {
  try {
    const response = await fetch(`https://api.worqnow.ai/education/${country}/statistics`);
    const data = await response.json();
    
    console.log(`\nStatistics for ${country.toUpperCase()}:`);
    console.log(`Total universities: ${data.total_universities}`);
    console.log(`Total scholarships: ${data.total_scholarships}`);
    console.log(`WAEC acceptance: ${data.waec_acceptance_rate}`);
    
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run examples
(async () => {
  console.log('=== WorqNow Education API Examples ===\n');
  
  console.log('\n1. All Australian Universities:');
  await getAllUniversities();
  
  console.log('\n\n2. Filtered Universities:');
  await getFilteredUniversities();
  
  console.log('\n\n3. Scholarships:');
  await getScholarships('ca');
  
  console.log('\n\n4. Statistics:');
  await getStatistics('au');
})();
