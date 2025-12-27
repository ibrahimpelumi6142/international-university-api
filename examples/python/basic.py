"""
WorqNow Education API - Python Example
Basic usage with requests library
"""

import requests
from typing import List, Dict, Optional

BASE_URL = "https://api.worqnow.ai"


def get_all_universities(country: str = "au", limit: int = 20) -> Dict:
    """
    Get all universities for a country
    
    Args:
        country: Country code (au, ca, usa, uk)
        limit: Number of results (1-100)
    
    Returns:
        Dictionary with count and data
    """
    url = f"{BASE_URL}/education/{country}/universities"
    params = {"limit": limit}
    
    response = requests.get(url, params=params)
    response.raise_for_status()
    
    data = response.json()
    print(f"Found {data['count']} universities")
    
    for uni in data['data']:
        print(f"- {uni['name']} ({uni['region']})")
    
    return data


def get_filtered_universities(
    country: str = "au",
    is_regional: Optional[bool] = None,
    has_scholarship: Optional[bool] = None,
    fee_band: Optional[str] = None
) -> Dict:
    """
    Get filtered universities
    
    Args:
        country: Country code
        is_regional: Filter by regional status
        has_scholarship: Filter by scholarship availability
        fee_band: Fee band (low, medium, high)
    
    Returns:
        Dictionary with filtered results
    """
    url = f"{BASE_URL}/education/{country}/universities"
    params = {}
    
    if is_regional is not None:
        params['is_regional'] = str(is_regional).lower()
    if has_scholarship is not None:
        params['has_scholarship'] = str(has_scholarship).lower()
    if fee_band:
        params['fee_band'] = fee_band
    
    response = requests.get(url, params=params)
    response.raise_for_status()
    
    data = response.json()
    print(f"\nFound {data['count']} universities matching filters")
    
    for uni in data['data']:
        print(f"\n{uni['name']}")
        print(f"  Region: {uni['region']}")
        print(f"  Fee Band: {uni.get('international_fee_band', 'N/A')}")
        if 'scholarships' in uni:
            print(f"  Scholarships: {len(uni['scholarships'])}")
    
    return data


def get_scholarships(country: str = "au") -> Dict:
    """
    Get all scholarships for a country
    
    Args:
        country: Country code
    
    Returns:
        Dictionary with scholarship data
    """
    url = f"{BASE_URL}/education/{country}/scholarships"
    
    response = requests.get(url)
    response.raise_for_status()
    
    data = response.json()
    print(f"\nFound {data['count']} universities with scholarships")
    
    total_scholarships = 0
    for uni_data in data['data']:
        scholarships = uni_data.get('scholarships', [])
        total_scholarships += len(scholarships)
        
        print(f"\n{uni_data['university_code']}:")
        for scholarship in scholarships:
            print(f"  - {scholarship['name']}: {scholarship['value']}")
    
    print(f"\nTotal scholarships: {total_scholarships}")
    return data


def get_statistics(country: str = "au") -> Dict:
    """
    Get statistics for a country
    
    Args:
        country: Country code
    
    Returns:
        Dictionary with statistics
    """
    url = f"{BASE_URL}/education/{country}/statistics"
    
    response = requests.get(url)
    response.raise_for_status()
    
    data = response.json()
    
    print(f"\nStatistics for {country.upper()}:")
    print(f"Total universities: {data['total_universities']}")
    print(f"Total scholarships: {data['total_scholarships']}")
    print(f"WAEC acceptance: {data['waec_acceptance_rate']}")
    
    if 'key_advantages' in data:
        print("\nKey advantages:")
        for advantage in data['key_advantages']:
            print(f"  - {advantage}")
    
    return data


def get_visa_guidance(country: str = "au") -> Dict:
    """
    Get visa guidance for a country
    
    Args:
        country: Country code
    
    Returns:
        Dictionary with visa information
    """
    url = f"{BASE_URL}/education/{country}/visa-guidance"
    
    response = requests.get(url)
    response.raise_for_status()
    
    data = response.json()
    
    print(f"\nVisa guidance for {country.upper()}:")
    if isinstance(data, dict):
        for key, value in data.items():
            print(f"{key}: {value}")
    
    return data


if __name__ == "__main__":
    print("=== WorqNow Education API Examples ===\n")
    
    # Example 1: Get all universities
    print("\n1. All Australian Universities:")
    get_all_universities("au", limit=5)
    
    # Example 2: Filtered search
    print("\n\n2. Regional universities with scholarships:")
    get_filtered_universities(
        country="au",
        is_regional=True,
        has_scholarship=True
    )
    
    # Example 3: Get scholarships
    print("\n\n3. Canadian Scholarships:")
    get_scholarships("ca")
    
    # Example 4: Get statistics
    print("\n\n4. Australian Statistics:")
    get_statistics("au")
    
    # Example 5: Visa guidance
    print("\n\n5. Visa Guidance:")
    get_visa_guidance("au")
