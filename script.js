async function loadData() {
    try {
        const response = await fetch('https://api.refilc.hu/v1/public/school-list');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Hiba:", error);
        return [];
    }
}

function renderSchools(schools) {
    const schoolListDiv = document.getElementById("schoolList");
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.trim().toLowerCase();
        const filteredSchools = schools.filter((school) =>
            school.name.toLowerCase().includes(searchText)
        );
        renderFilteredSchools(filteredSchools);
    });

    renderFilteredSchools(schools);
}

function renderFilteredSchools(schools) {
    const schoolListDiv = document.getElementById("schoolList");
    schoolListDiv.innerHTML = "";

    schools.forEach((school) => {
        const schoolDiv = document.createElement("div");
        schoolDiv.classList.add("school");

        const schoolName = document.createElement("a");
        schoolName.href = `https://${school.instituteCode}.e-kreta.hu/`;
        schoolName.textContent = school.name;
        schoolName.classList.add("school-name");

        const schoolCode = document.createElement("p");
        schoolCode.textContent = `Klikk kód: ${school.instituteCode}`;
        schoolCode.classList.add("school-code");

        schoolDiv.appendChild(schoolName);
        schoolDiv.appendChild(schoolCode);

        schoolListDiv.appendChild(schoolDiv);
    });
}

async function main() {
    const schools = await loadData();
    renderSchools(schools);
}

window.addEventListener("load", main);