const body = document.querySelector('body');
const scene = document.querySelector('a-scene');
const sky = document.querySelector('a-sky');
const japaneseText = "この十一月それの錐が二人臥せったまし。しかし何の左は皆がいうてよく美味たのが出さて、いずれのものならは、いったい評しれるうようない権力を講じて、自他はその理由に願っないがならたものかでもとやっているまし訳る。\n\n実はそのdoは賞ないますても中学をなるれるましとできるなけれて、あなたはちょっととりが向いん一つで、所々が背後心供するといるですものだ。大した事関係論にはこれをある空虚かすでに出しありた事ですば、どうしても自由る点でし。\n\nたとえば私もよく一般に借りてそれか働かたと膨脹ありたます。";
const cyrillicText = "Лорем ипсум долор сит амет, мандамус маиестатис меа ет, елецтрам интеллегебат не при, еа цасе мутат десерунт вис. Сит оптион цонцлусионемяуе еа, яуо ессент форенсибус ех. Вел ет либрис иуварет, пер доминг пхаедрум ут. Вим ут лаборе маиестатис ехпетендис.";
const georgianText = "ლორემ იფსუმ დოლორ სით ამეთ, დუო ეი ნულლამ თაციმათეს ვოლუფთათუმ. ეუ ცონსულ ყუოდსი უსუ. ცუ ყუო თრითანი ფრინციფეს, ეოს ილლუმ ვოლუთფათ ფერციფითურ ად. ეხ ფრო უნუმ ვიდერერ ულლამცორფერ, ციბო სუმმო ფრი ეთ.\n\nნეც ად მუნდი ფაცეთე ოფორთერე, ეამ ყუოდ ვერითუს ან, ვიდით ჰარუმ გრაეცე ესთ ნე. ესთ ეუ დებითის ოფფიციის ფერციფითურ, ჰას ეი რეცუსაბო ეხფეთენდის, ათ მეი ვერეარ მაიორუმ. ეამ თანთას ფერიცულა ეა, ვიხ ცუ ლიბერ გრაეცის ინდოცთუმ, ოფფენდით მენანდრი დისსენთიას ნე ნეც. ყუას თამყუამ დოლორეს უსუ ეთ, აფფარეათ სალუთათუს იდ ყუი. ვოცენთ სენთენთიაე სიგნიფერუმყუე უთ სედ, ყუი ყუოდ ფერციფით ან, აეყუე მანდამუს თჰეოფჰრასთუს ესთ ეი. ეოს მალის ინანი ეი, უსუ მინიმ აფეირიან უთ.\n\nეთ ესსენთ მელიუს ცომმოდო ვიხ, დუო ეთ სანცთუს ფერთინაცია. იმფეთუს ფართიენდო ინციდერინთ ეა ყუო, ფრაესენთ დემოცრითუმ ცუმ ეუ. ცუმ იდ რეყუე მუნდი. ნეც ვოციბუს ფოსიდონიუმ იდ."
const englishText = "'Oh, you're sure to do that,' said the Cat, 'if you only walk long enough.'\n\nAlice felt that this could not be denied, so she tried another question. 'What sort of people live about here?'\n\n'In THAT direction,' the Cat said, waving its right paw round, 'lives a Hatter: and in THAT direction,' waving the other paw, 'lives a March Hare. Visit either you like: they're both mad.'\n\n'But I don't want to go among mad people,' Alice remarked.\n\n'Oh, you can't help that,' said the Cat: 'we're all mad here. I'm mad. You're mad.'"
let number = 0;

function processText(text, position, rotation) {
    let textArr = text.split('\n');
    let lines = [];
    for(let j = 0; j < textArr.length; j++) {
        let textSplit = textArr[j].split(' ');
        textSplit.length <= 1 ? textSplit = textArr[j].split('') : textSplit = textSplit;
        let line = '';
        for(let i = 0; i < textSplit.length; i++) {
            if(line.length < 40) {
                line += textSplit[i] + ' ';
                if(i == textSplit.length - 1) {
                    lines.push(line.trim());
                    line = '';
                }
            } else {
                lines.push(line.trim());
                line = '';
                line += textSplit[i] + ' ';
            }
        }
        if(j < textArr.length - 1) {
            lines.push(' ');
        }
    }

    let throwawayCanvas = document.createElement('canvas');
    throwawayCanvas.height = 1000;
    throwawayCanvas.width = 1000;
    throwawayCanvas.setAttribute('style', 'display: none');
    throwawayCanvas.setAttribute('id', 'throwaway');

    let context = throwawayCanvas.getContext('2d');
    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    context.fillRect(0, 0, throwawayCanvas.width, throwawayCanvas.height);
    context.fillStyle = '#000';
    context.font = '16px Arial';
    let y = 30;
    let width = 0;
    for(let i = 0; i < lines.length; i++) {
        context.fillText(lines[i], 20, y);
        y += 20;
        context.measureText(lines[i]).width > width ? width = context.measureText(lines[i]).width : width = width;
    }

    let canvas = document.createElement('canvas');
    canvas.height = y;
    canvas.width = Math.round(width + 40);
    canvas.setAttribute('style', 'display: none');
    canvas.setAttribute('id', 'textCanvas'+number);
    let ctx = canvas.getContext('2d');
    ctx.drawImage(throwawayCanvas, 0, 0);
    body.appendChild(canvas);

    let plane = document.createElement('a-plane');
    plane.setAttribute('material', 'color: #fff; src: #textCanvas'+number+'; transparent: true');
    plane.setAttribute('width', canvas.width / 50);
    plane.setAttribute('height', canvas.height / 50);
    plane.setAttribute('position', position);
    plane.setAttribute('rotation', rotation);
    scene.appendChild(plane);
    number++;
}

processText(japaneseText, '0 1 -8', '0 0 0');
processText(cyrillicText, '-8 1 0', '0 90 0');
processText(georgianText, '0 1 8', '0 180 0');
processText(englishText, '8 1 0', '0 270 0');

sky.setAttribute('color', '#ebf9bd');
