export default function sketch(p) {
    p.setup = () => {
      p.createCanvas(document.getElementsByClassName("p5Sketch")[0].scrollWidth - 2, 596);
    };
  
    p.draw = () => {
        if (p.mouseIsPressed) {
            p.fill(0);
        } else {
            p.fill(255);
        }
        p.ellipse(p.mouseX, p.mouseY, 80, 80);
    };
  }
  