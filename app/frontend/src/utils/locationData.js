// Location data utilities for Vietnam administrative units

// Get all provinces/cities
export const fetchProvinces = async () => {
  try {
    const response = await fetch('https://provinces.open-api.vn/api/p/');
    if (!response.ok) {
      throw new Error('Failed to fetch provinces');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return [];
  }
};

// Get districts by province code
export const fetchDistrictsByProvince = async (provinceCode) => {
  if (!provinceCode) return [];
  
  try {
    const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
    if (!response.ok) {
      throw new Error('Failed to fetch districts');
    }
    const data = await response.json();
    return data.districts || [];
  } catch (error) {
    console.error('Error fetching districts:', error);
    return [];
  }
};

// Get wards by district code
export const fetchWardsByDistrict = async (districtCode) => {
  if (!districtCode) return [];
  
  try {
    const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
    if (!response.ok) {
      throw new Error('Failed to fetch wards');
    }
    const data = await response.json();
    return data.wards || [];
  } catch (error) {
    console.error('Error fetching wards:', error);
    return [];
  }
};
