const body = document.querySelector('body');
const scene = document.querySelector('a-scene');
const sky = document.querySelector('a-sky');
const text = "この十一月それの錐が二人臥せったまし。しかし何の左は皆がいうてよく美味たのが出さて、いずれのものならは、いったい評しれるうようない権力を講じて、自他はその理由に願っないがならたものかでもとやっているまし訳る。\n\n実はそのdoは賞ないますても中学をなるれるましとできるなけれて、あなたはちょっととりが向いん一つで、所々が背後心供するといるですものだ。大した事関係論にはこれをある空虚かすでに出しありた事ですば、どうしても自由る点でし。\n\nたとえば私もよく一般に借りてそれか働かたと膨脹ありたます。";

let textArr = text.split('');
let line = '';
let height = 30;
let lines = [];
for(let i = 0; i < textArr.length; i++) {
    if(line.length < 40) {
        line += textArr[i] + ' ';
        if(i == textArr.length - 1 || textArr[i] == "\n") {
            lines.push(line);
            line = '';
            height += 20;
        }
    } else {
        lines.push(line);
        line = '';
        line += textArr[i] + ' ';
        height += 20;
    }
}

let canvas = document.createElement('canvas');
canvas.setAttribute('width', 450);
canvas.setAttribute('height', height);
canvas.setAttribute('style', 'display: none');
canvas.setAttribute('id', 'textCanvas');

let context = canvas.getContext('2d');
context.fillStyle = 'rgba(255, 255, 255, 0.5)';
context.fillRect(0, 0, canvas.width, canvas.height);
context.fillStyle = '#000';
context.font = '16px Arial';
let y = 30;
for(let i = 0; i < lines.length; i++) {
    context.fillText(lines[i], 20, y);
    y += 20;
}
body.appendChild(canvas);

let plane = document.createElement('a-plane');
plane.setAttribute('material', 'color: #fff; src: #textCanvas; transparent: true');
plane.setAttribute('width', canvas.width / 50);
plane.setAttribute('height', canvas.height / 50);
plane.setAttribute('position', '0 1 -8');
scene.appendChild(plane);

sky.setAttribute('color', '#ebf9bd');
