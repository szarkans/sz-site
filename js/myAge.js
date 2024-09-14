document.addEventListener('DOMContentLoaded', function () {
    const birthDate = new Date('2004-10-19');
    const ageSpan = document.getElementById('age');

    const calculateAge = (birthDate) => {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    ageSpan.textContent = calculateAge(birthDate);
});
