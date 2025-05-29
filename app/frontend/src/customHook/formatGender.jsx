const formatGender = (gender) => {
    if (!gender) return '';
    return gender === 'male' ? 'Nam' : gender === 'female' ? 'Nữ' : 'Khác';
};

export default formatGender;