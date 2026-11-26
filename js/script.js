// 기존에 정상 작동하는 화면 진입 효과. 기능 추가 시 유지한다.
document.documentElement.classList.add('has-js');
const revealSections = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealSections.forEach((section) => observer.observe(section));
} else {
  revealSections.forEach((section) => section.classList.add('is-visible'));
}

const compareSection = document.querySelector('#unemployment-compare-section');
if (compareSection) {
  const buttonA = compareSection.querySelector('.year-button-a');
  const buttonB = compareSection.querySelector('.year-button-b');
  const rateValue = compareSection.querySelector('.year-rate');
  const yearLabel = compareSection.querySelector('.year-label');
  const title = compareSection.querySelector('.metric-title');
  const description = compareSection.querySelector('.year-description');
  const chart = compareSection.querySelector('.year-chart');
  const chartLabel = compareSection.querySelector('.chart-footer span:first-child');
  const status = compareSection.querySelector('.practice-status');
  const data = {
    a: {
      year: '연도 A',
      label: 'YEAR A',
      rate: '4.2',
      description: '연도 A를 선택한 화면입니다.',
      image: 'images/year-a.svg',
      alt: '가상 데이터 연도 A 실업률 추이 그래프'
    },
    b: {
      year: '연도 B',
      label: 'YEAR B',
      rate: '3.6',
      description: '연도 B를 선택한 화면입니다.',
      image: 'images/year-b.svg',
      alt: '가상 데이터 연도 B 실업률 추이 그래프'
    }
  };

  const selectYear = (year) => {
    const selected = data[year];
    const isYearA = year === 'a';
    const selectedButton = isYearA ? buttonA : buttonB;
    const otherButton = isYearA ? buttonB : buttonA;

    rateValue.firstChild.textContent = selected.rate;
    yearLabel.textContent = selected.label;
    title.textContent = `${selected.year}의 실업률 변화`;
    description.textContent = selected.description;
    chart.src = selected.image;
    chart.alt = selected.alt;
    chartLabel.textContent = selected.year;
    status.lastChild.textContent = ` ${selected.year}의 학습용 가상 데이터가 표시 중입니다.`;
    selectedButton.classList.add('active');
    selectedButton.setAttribute('aria-pressed', 'true');
    otherButton.classList.remove('active');
    otherButton.setAttribute('aria-pressed', 'false');
  };

  buttonA.addEventListener('click', () => selectYear('a'));
  buttonB.addEventListener('click', () => selectYear('b'));
}
