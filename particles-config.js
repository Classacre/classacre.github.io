const isMobile = window.innerWidth <= 768;

const heroParticles = {
  "particles": {
    "number": { "value": isMobile ? 40 : 80 },
    "color": { "value": ["#00bf63", "#004aad"] },
    "shape": { "type": "circle" },
    "opacity": { "value": 0.5 },
    "size": { "value": 3 },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#00bf63",
      "opacity": 0.4,
      "width": 1,
      "gradient": {
        "enable": true,
        "start": "#00bf63",
        "end": "#004aad"
      }
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "out_mode": "bounce"
    }
  }
};

const servicesParticles = {
  "particles": {
    "number": { "value": isMobile ? 20 : 40 },
    "color": { "value": "#ffffff" },
    "shape": { "type": "polygon", "polygon": { "nb_sides": 6 } },
    "opacity": { "value": 0.3 },
    "size": { "value": 4 },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "top",
      "straight": true
    }
  }
};

const teamParticles = {
  "particles": {
    "number": { "value": isMobile ? 15 : 30 },
    "color": { "value": "#efef2c" },
    "shape": { "type": "circle" },
    "opacity": { "value": 0.4 },
    "size": { "value": 6 },
    "move": {
      "enable": true,
      "speed": 3,
      "direction": "none",
      "random": true
    }
  }
};

const contactParticles = {
    "particles": {
        "number": { "value": isMobile ? 25 : 50 },
        "color": { "value": ["#00bf63", "#004aad"] },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.3 },
        "size": { "value": 4 },
        "move": {
            "enable": true,
            "speed": 1.5,
            "direction": "none",
            "random": true
        }
    }
};