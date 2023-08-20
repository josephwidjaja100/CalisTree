new p5();

let regularFont;
let headingFont;
let titleFont;
let width;
let height;
let skillInfo;
let creatorImg;

function preload(){
  regularFont = loadFont('fonts/Raleway-Medium.ttf');
  headingFont = loadFont('fonts/Raleway-Regular.ttf');
  titleFont = loadFont('fonts/Raleway-SemiBold.ttf');
  skillInfo = loadJSON('skill_info.json');
  creatorImg = loadImage('creator_photo.jpeg');
}

class SkillNode {
  constructor(x, y, name) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.r = 27;
    this.locked = true;
  }

  drawNode() {
    push();
    if (this.locked) {
      fill('#808080');
    }
    else {
      fill('#0484DC');
    }
    stroke('FFFFFF');
    strokeWeight(3*min(width/1991, height/1122));
    ellipse(this.x, this.y, this.r*2, this.r*2);
    pop();

    push();
    fill('FFFFFF');
    textAlign(CENTER, CENTER);
    textSize(8*min(width/1991, height/1122));
    textFont(regularFont);
    noStroke();
    text(this.name, this.x-this.r, this.y-this.r, 2*this.r, 2*this.r);
    pop();
  }
}

class Confetti {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.speed = s;
    this.time = random(0, 200);
    this.confettiColor = [color('#00aeef'), color('#d64040'), color('#72c8b6')];
    this.color = random(this.confettiColor);
    this.amp = random(2, 30);
    this.phase = random(0.5, 2);
    this.size = 25*min(width/1991, height/1122);
  }

  confettiDisplay() {
    push();
    fill(this.color);
    noStroke();
    translate(this.x, this.y);
    translate(this.amp * sin(this.time*this.phase), this.speed * cos(2*this.time*this.phase));
    rotate(this.time);
    rectMode(CENTER);
    scale(cos(this.time/4), sin(this.time/4));
    rect(0, 0, this.size, this.size/2);
    pop();

    this.time = this.time + 0.1;
    this.speed += 1/10;
    this.y += this.speed;
  }
}

let skillNameList = ["Calisthenics", "Push", "Pull", "Legs", "Push-Up", "Clap Push-Up", "Archer Push-Up", "Planche Lean", "Pike Hold", "L-Sit", "V-Sit", "Manna", "Back Clap Push-Up", "Superman Push-Up", "Pike Push-Up", "Tuck Bent-Arm Press to Handstand", "Straddle Bent-Arm Press to Handstand", "Full Bent-Arm Press to Handstand", "Tuck Straight-Arm Press to Handstand", "Straddle Straight-Arm Press to Handstand", "Full Straight-Arm Press to Handstand", "Wall Handstand Hold", "Wall Handstand Push-Up", "Handstand", "Basic Handstand Shapes", "Stag Handstand", "Diamond Handstand", "Straddle Handstand", "Tuck Handstand", "Advanced Handstand Shapes", "One Arm Fingertip Support Handstand", "Seven Handstand", "Hollow Back Handstand", "Straddle One Arm Handstand", "Full One Arm Handstand", "Handstand Push-Up", "Tuck Planche", "Advanced Tuck Planche", "Single Leg Planche", "Straddle Planche", "Full Planche", "Pseudo Planche Push-Up", "Straddle 90 Degree Hold", "Full 90 Degree Hold", "Tuck Planche Push-Up", "Advanced Tuck Planche Push-Up", "Single Leg Planche Push-Up", "Straddle Planche Push-Up", "Full Planche Push-Up", "One Arm Push-Up", "Chin-Up", "Assisted One Arm Chin-Up", "One Arm Chin-Up", "Pull-Up", "High Pull-Up", "Archer Pull-Up", "Assisted One Arm Pull-Up", "One Arm Pull-Up", "Muscle-Up", "Tuck Front Lever", "Advanced Tuck Front Lever", "Single Leg Front Lever", "Straddle Front Lever", "Full Front Lever", "Tuck Front Lever Pull-Up", "Advanced Tuck Front Lever Pull-Up", "Single Leg Front Lever Pull-Up", "Straddle Front Lever Pull-Up", "Full Front Lever Pull-Up", "Tuck Back Lever", "Advanced Tuck Back Lever", "Single Leg Back Lever", "Straddle Back Lever", "Full Back Lever", "Squat", "Squat Jump", "Pistol Squat", "Dragon Squat"];

let skillNameTree = {
  "Calisthenics": ["Push", "Pull", "Legs"],
  "Push": ["Calisthenics", "Push-Up"],
  "Pull": ["Calisthenics", "Pull-Up", "Chin-Up"],
  "Legs": ["Calisthenics", "Squat"],
  "Push-Up": ["Push", "Clap Push-Up", "Archer Push-Up", "Planche Lean", "Pike Hold", "L-Sit"],
  "Clap Push-Up": ["Push-Up", "Back Clap Push-Up"],
  "Back Clap Push-Up": ["Clap Push-Up", "Superman Push-Up"],
  "Superman Push-Up": ["Back Clap Push-Up"],
  "Archer Push-Up": ["Push-Up", "One Arm Push-Up"],
  "Planche Lean": ["Push-Up", "Tuck Planche", "Pseudo Planche Push-Up"],
  "Pike Hold": ["Push-Up", "Pike Push-Up", "Wall Handstand Hold"],
  "Pike Push-Up": ["Pike Hold", "Tuck Bent-Arm Press to Handstand", "Tuck Straight-Arm Press to Handstand", "Wall Handstand Push-Up"],
  "Tuck Bent-Arm Press to Handstand": ["Pike Push-Up", "Straddle Bent-Arm Press to Handstand"],
  "Straddle Bent-Arm Press to Handstand": ["Tuck Bent-Arm Press to Handstand", "Full Bent-Arm Press to Handstand"],
  "Full Bent-Arm Press to Handstand": ["Straddle Bent-Arm Press to Handstand"],
  "Tuck Straight-Arm Press to Handstand": ["Pike Push-Up", "Straddle Straight-Arm Press to Handstand"],
  "Straddle Straight-Arm Press to Handstand": ["Tuck Straight-Arm Press to Handstand", "Full Straight-Arm Press to Handstand"],
  "Full Straight-Arm Press to Handstand": ["Straddle Straight-Arm Press to Handstand"],
  "Wall Handstand Hold": ["Pike Hold", "Handstand"],
  "Wall Handstand Push-Up": ["Pike Push-Up", "Handstand Push-Up"],
  "Handstand Push-Up": ["Wall Handstand Push-Up"],
  "Handstand": ["Wall Handstand Hold", "Basic Handstand Shapes", "Advanced Handstand Shapes"],
  "Basic Handstand Shapes": ["Handstand", "Stag Handstand", "Diamond Handstand", "Straddle Handstand", "Tuck Handstand"],
  "Stag Handstand": ["Basic Handstand Shapes"],
  "Diamond Handstand": ["Basic Handstand Shapes"],
  "Straddle Handstand": ["Basic Handstand Shapes"],
  "Tuck Handstand": ["Basic Handstand Shapes"],
  "Advanced Handstand Shapes": ["Handstand", "One Arm Fingertip Support Handstand", "Seven Handstand", "Hollow Back Handstand"],
  "One Arm Fingertip Support Handstand": ["Advanced Handstand Shapes", "Straddle One Arm Handstand"],
  "Straddle One Arm Handstand": ["One Arm Fingertip Support Handstand", "Full One Arm Handstand"],
  "Full One Arm Handstand": ["Straddle One Arm Handstand"],
  "Seven Handstand": ["Advanced Handstand Shapes"],
  "Hollow Back Handstand": ["Advanced Handstand Shapes"],
  "Tuck Planche": ["Planche Lean", "Tuck Planche Push-Up", "Advanced Tuck Planche"],
  "Advanced Tuck Planche": ["Tuck Planche", "Advanced Tuck Planche Push-Up", "Single Leg Planche"],
  "Single Leg Planche": ["Advanced Tuck Planche", "Single Leg Planche Push-Up", "Straddle Planche"],
  "Straddle Planche": ["Single Leg Planche", "Straddle Planche Push-Up", "Full Planche"],
  "Full Planche": ["Straddle Planche", "Full Planche Push-Up"],
  "Pseudo Planche Push-Up": ["Planche Lean", "Straddle 90 Degree Hold"],
  "Straddle 90 Degree Hold": ["Pseudo Planche Push-Up", "Full 90 Degree Hold"],
  "Full 90 Degree Hold": ["Straddle 90 Degree Hold"],
  "Tuck Planche Push-Up": ["Tuck Planche"],
  "Advanced Tuck Planche Push-Up": ["Advanced Tuck Planche"],
  "Single Leg Planche Push-Up": ["Single Leg Planche"],
  "Straddle Planche Push-Up": ["Straddle Planche"],
  "Full Planche Push-Up": ["Full Planche"],
  "One Arm Push-Up": ["Archer Push-Up"],
  "L-Sit": ["Push-Up", "V-Sit"],
  "V-Sit": ["L-Sit", "Manna"],
  "Manna": ["V-Sit"],
  "Chin-Up": ["Pull", "Assisted One Arm Chin-Up"],
  "Assisted One Arm Chin-Up": ["Chin-Up", "One Arm Chin-Up"],
  "One Arm Chin-Up": ["Assisted One Arm Chin-Up"],
  "Pull-Up": ["Pull", "High Pull-Up", "Archer Pull-Up", "Tuck Front Lever", "Tuck Back Lever"],
  "Tuck Front Lever": ["Pull-Up", "Tuck Front Lever Pull-Up", "Advanced Tuck Front Lever"],
  "Advanced Tuck Front Lever": ["Tuck Front Lever", "Advanced Tuck Front Lever Pull-Up", "Single Leg Front Lever"],
  "Single Leg Front Lever": ["Advanced Tuck Front Lever", "Single Leg Front Lever Pull-Up", "Straddle Front Lever"],
  "Straddle Front Lever": ["Single Leg Front Lever", "Straddle Front Lever Pull-Up", "Full Front Lever"],
  "Full Front Lever": ["Straddle Front Lever", "Full Front Lever Pull-Up"],
  "Tuck Front Lever Pull-Up": ["Tuck Front Lever"],
  "Advanced Tuck Front Lever Pull-Up": ["Advanced Tuck Front Lever"],
  "Single Leg Front Lever Pull-Up": ["Single Leg Front Lever"],
  "Straddle Front Lever Pull-Up": ["Straddle Front Lever"],
  "Full Front Lever Pull-Up": ["Full Front Lever"],
  "Tuck Back Lever": ["Pull-Up", "Advanced Tuck Back Lever"],
  "Advanced Tuck Back Lever": ["Tuck Back Lever", "Single Leg Back Lever"],
  "Single Leg Back Lever": ["Advanced Tuck Back Lever", "Straddle Back Lever"],
  "Straddle Back Lever": ["Single Leg Back Lever", "Full Back Lever"],
  "Full Back Lever": ["Straddle Back Lever"],
  "High Pull-Up": ["Pull-Up", "Muscle-Up"],
  "Muscle-Up": ["High Pull-Up"],
  "Archer Pull-Up": ["Pull-Up", "Assisted One Arm Pull-Up"],
  "Assisted One Arm Pull-Up": ["Archer Pull-Up", "One Arm Pull-Up"],
  "One Arm Pull-Up": ["Assisted One Arm Pull-Up"],
  "Squat": ["Legs", "Squat Jump", "Pistol Squat"],
  "Squat Jump": ["Squat"],
  "Pistol Squat": ["Squat", "Dragon Squat"],
  "Dragon Squat": ["Pistol Squat"]
};

let skillList = [];
for(let i = 0; i < skillNameList.length; i++){
  append(skillList, new SkillNode(0, 0, skillNameList[i]));
}

let skillTree = {};
for(let key in skillNameTree){
  let ind = -1;
  for(let i = 0; i < skillNameList.length; i++){
    if(skillNameList[i] == key){
      ind = i;
    }
  }
  skillTree[ind] = [];
  for(let i = 0; i < skillNameTree[key].length; i++){
    let ind2 = -1;
    for(let j = 0; j < skillNameList.length; j++){
      if(skillNameList[j] == skillNameTree[key][i]){ 
        ind2 = j;
      }
    }
    append(skillTree[ind], ind2);
  }
}

let selectedNode = -1;
let selectedDropdown = "What is CalisTree?";
let branch = [];
let confetti = [];
let releaseConfetti = false;
let linkBoxIdx = 0;
let linkBoxes = [];
let linkList = [];
let connectionDist = 81;
let leftSidebar = 510;
let sidebarWidth = 495;
let topSidebar = 25;
let sidebarHeight = 1072;
let sidebarR = 25;
let titleFontSize = 50;
let titleTop = 40;
let infoFontSize = 40;
let infoCoord = 20;
let leftHeading = 485;
let headingWidth = 445;
let headingTop = 120;
let headingHeight = 50;
let headingMargin = 10;
let headingFontSize = 30;
let headingR = 10;
let rightTriangleLeft = 470;
let rightTriangleTop = 140;
let triangleLength = 10;
let bodyLeft = 450;
let bodyTop = 170;
let bodyWidth = 400;
let bodyFontSize = 18;
let nodeOutline = 15;
let completeButtonTop = 140;
let completeButtonHeight = 90;
let completeButtonX = 262.5;
let completeButtonY = completeButtonTop-completeButtonHeight/2;
let lead = 5;
let nodeName;
let imgMargin = 30;

function setup() {
  width = windowWidth;
  height = windowHeight;

  connectionDist *= min(width/1991, height/1122);
  leftSidebar *= width/1991;
  sidebarWidth *= width/1991;
  topSidebar *= height/1122;
  sidebarHeight *= height/1122;
  sidebarR *= min(width/1991, height/1122);
  titleFontSize *= min(width/1991, height/1122);
  titleTop *= height/1122;
  infoFontSize *= min(width/1991, height/1122);
  infoCoord *= height/1122;
  leftHeading *= width/1991;
  headingWidth *= width/1991;
  headingTop *= height/1122;
  headingHeight *= height/1122;
  headingMargin *= height/1122;
  headingFontSize *= min(width/1991, height/1122);
  headingR *= min(width/1991, height/1122);
  rightTriangleLeft *= width/1991;
  rightTriangleTop *= height/1122;
  triangleLength *= min(width/1991, height/1122);
  bodyLeft *= width/1991;
  bodyTop *= height/1122;
  bodyWidth *= width/1991;
  bodyFontSize *= min(width/1991, height/1122);
  nodeOutline *= height/1122;
  completeButtonTop *= height/1122;
  completeButtonHeight *= height/1122;
  completeButtonX *= width/1991;
  completeButtonY *= height/1122;
  lead *= height/1122;
  imgMargin *= height/1122;

  for(let i = 0; i < 300; i++){
    confetti[i] = new Confetti(random(0, width), random(-height, 0), random(-1, 1));
  }

  for(let i = 0; i < skillList.length; i++){
    skillList[i].x *= width/1991;
    skillList[i].y *= height/1122;
    skillList[i].r = min(skillList[i].r*width/1991, skillList[i].r*height/1122);
  }

  // nodeName = "CalisTree";
  // t = text(";alksdjf;alksdf", 400, 400);
  // t.mousePressed(openLink);
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
}

function drawConnection(node1, node2){
  push();
  stroke('FFFFFF');
  strokeWeight(3*width/1991);
  line(node1.x, node1.y, node2.x, node2.y);
  pop();
}

function dfs(node, prev){
  append(branch, node);
  for(let i = 0; i < skillTree[node].length; i++){
    let next = skillTree[node][i];
    if(next != prev && (skillList[next].locked == false || skillList[skillTree[next][0]].locked == false)){
      dfs(next, node);
    }
  }
}

function calcForce(nodeIdx, dx, dy){
  let x = skillList[nodeIdx].x + dx;
  let y = skillList[nodeIdx].y + dy;

  let amt = 1/(x-skillList[nodeIdx].r) + 1/(width-leftSidebar-x-skillList[nodeIdx].r) + 1/(y-infoFontSize-skillList[nodeIdx].r) + 1/(height-y-skillList[nodeIdx].r);
  // let amt = 0;
  for(let i = 0; i < skillList.length; i++){
    let ok = false;
    for(let j = 0; j < skillTree[nodeIdx].length; j++){
      if(skillTree[nodeIdx][j] == i){
        ok = true;
        break;
      }
    }
    if((skillList[i].locked == false || skillList[skillTree[i][0]].locked == false) && i != nodeIdx && !ok){
      if(dist(skillList[i].x, skillList[i].y, x, y) < 2*skillList[i].r){
        amt += sqrt(1/max(dist(skillList[i].x, skillList[i].y, x, y),1));
      }
      else{
        amt += 1/max(dist(skillList[i].x, skillList[i].y, x, y),1);
      }
    }
  }

  for(let i = 0; i < skillTree[nodeIdx].length; i++){
    let node = skillTree[nodeIdx][i];
    if(skillList[node].locked == false || skillList[skillTree[node][0]].locked == false){
      let diff = abs(dist(skillList[node].x, skillList[node].y, x, y) - connectionDist);
      diff = max(diff, 1);
      amt += 4*(1-(1/diff));
    }
  }
  // console.log(amt);
  return amt;
}

function inCircle(a, b, x, y, r){
  let distPoints = pow(a-x, 2) + pow(b-y,2);
  let r2 = pow(r, 2);
  if(distPoints < r2){
    return true; 
  }
  return false;
}

function mousePressed(){
  //     rect(width-490, height-135, 460, 90, 10,10,10,10);
  for(let i = 0; i < skillList.length; i++){
    if(inCircle(mouseX, mouseY, skillList[i].x, skillList[i].y, skillList[i].r)){
      if(selectedNode == i){
        selectedNode = -1;
        selectedDropdown = "What is CalisTree?";
      }
      else{
        selectedNode = i;
        // console.log(Object.keys(skillInfo[skillList[i].name]));
        selectedDropdown = Object.keys(skillInfo[skillList[i].name])[0];
      }
    }
  }

  if(width-leftHeading < mouseX && mouseX < width-leftHeading+headingWidth && height-completeButtonTop < mouseY && mouseY < height-completeButtonTop+completeButtonHeight){
    if(skillList[selectedNode].locked == true){
      skillList[selectedNode].locked = false;
      let ang = atan2(skillList[selectedNode].y - skillList[skillTree[selectedNode][0]].y, skillList[selectedNode].x - skillList[skillTree[selectedNode][0]].x);
      if (selectedNode == 0) {
        ang = 0;
      }
      for (let j = 0; j < skillTree[selectedNode].length; j++) {
        if (skillTree[selectedNode][j] > selectedNode) {
          skillList[skillTree[selectedNode][j]].x = connectionDist*cos(ang) + skillList[selectedNode].x;
          skillList[skillTree[selectedNode][j]].y = connectionDist*sin(ang) + skillList[selectedNode].y;
        }
      }
      if(selectedNode > 3 && skillList[selectedNode].name != "Basic Handstand Shapes" && skillList[selectedNode].name != "Advanced Handstand Shapes"){
        releaseConfetti = true;
      }
    }
  }

  for(let i = 0; i < linkBoxes.length; i++){
    if(linkBoxes[i][0] < mouseX && mouseX < linkBoxes[i][0] + linkBoxes[i][2] && linkBoxes[i][1] < mouseY && mouseY < linkBoxes[i][1] + linkBoxes[i][3]){
      openLink(linkList[i]);
    }
  }
}

function openLink(link){
  window.open(link);
}

function findLines(font, size, text, limit){
  textFont(font);
  textSize(size);
  // console.log(text);
  let lines = [];
  // console.log(lines);
  let words = splitTokens(text, [" "]);
  // console.log(words);
  let cur = "";
  let amt = 1;
  for(let i = 0; i < words.length; i++){
    for(let j = 0; j < words[i].length; j++){
      if(words[i][j] == "\n"){
        amt++;
        append(lines, cur);
        cur = "";
      }
    }
    // console.log(cur);
    if(textWidth(cur + words[i] + " ") > limit){
      append(lines, cur);
      cur = words[i] + " ";
      amt++;
    }
    else{
      cur += words[i] + " ";
    }
  }
  amt++;
  append(lines, cur);
  // console.log(lines);
  return amt*(size+lead);
}

function draw() {
  background('#222222');

  try{
    push();
    fill('#808080');
    rect(width-leftSidebar, topSidebar, sidebarWidth, sidebarHeight, sidebarR,sidebarR,sidebarR,sidebarR);
    pop();

    push();
    textFont(titleFont);
    textSize(titleFontSize);
    textAlign(LEFT, TOP);
    fill('#FFFFFF');
    text("CalisTree", width-leftHeading, titleTop);
    pop();

    if(selectedNode == -1){
      nodeName = "CalisTree";
    }
    else{
      nodeName = skillList[selectedNode].name;
    }

    push();
    textFont(titleFont);
    textSize(infoFontSize);
    textAlign(LEFT, TOP);
    fill('#FFFFFF');
    text("Sidebar Info: " + nodeName, infoCoord, infoCoord);
    pop();

    let cnt = 0;
    let reachedSelected = false;
    // console.log(selectedDropdown);
    let creatorImgWidth = creatorImg.width*min(windowWidth/1991, windowHeight/1122);
    let creatorImgHeight = creatorImg.height*min(windowWidth/1991, windowHeight/1122);
    let offset = findLines(regularFont, bodyFontSize, skillInfo[nodeName][selectedDropdown], bodyWidth);
    if(selectedDropdown == "About the Creator"){
      offset += (creatorImgHeight+imgMargin);
    }
    // console.log(offset);
    for(let key in skillInfo[nodeName]){
      if(key != selectedDropdown){
        if(!reachedSelected){
          push();
          noStroke();
          fill('#a9a9a9');
          rect(width-leftHeading, headingTop+(headingHeight+headingMargin)*cnt, headingWidth, headingHeight, headingR,headingR,headingR,headingR);
          pop();

          if(width-leftHeading < mouseX && mouseX < width-leftHeading+headingWidth && headingTop+(headingHeight+headingMargin)*cnt < mouseY && mouseY < headingTop+(headingHeight+headingMargin)*cnt+headingHeight){
            selectedDropdown = key;
          }

          push();
          noStroke();
          fill('#FFFFFF');
          triangle(width-rightTriangleLeft, rightTriangleTop+(headingHeight+headingMargin)*cnt, width-rightTriangleLeft, (rightTriangleTop+triangleLength)+(headingHeight+headingMargin)*cnt, width-(rightTriangleLeft-triangleLength), (rightTriangleTop+triangleLength/2)+(headingHeight+headingMargin)*cnt);
          pop();
        }
        else{
          push();
          noStroke();
          fill('#a9a9a9');
          rect(width-leftHeading, headingTop+(headingHeight+headingMargin)*cnt+offset, headingWidth, headingHeight, headingR,headingR,headingR,headingR);
          pop();

          if(width-leftHeading < mouseX && mouseX < width-leftHeading+headingWidth && headingTop+(headingHeight+headingMargin)*cnt+offset < mouseY && mouseY < headingTop+(headingHeight+headingMargin)*cnt+offset+headingHeight){
            selectedDropdown = key;
          }

          push();
          noStroke();
          fill('#FFFFFF');
          triangle(width-rightTriangleLeft, rightTriangleTop+(headingHeight+headingMargin)*cnt+offset, width-rightTriangleLeft, (rightTriangleTop+triangleLength)+(headingHeight+headingMargin)*cnt+offset, width-(rightTriangleLeft-triangleLength), (rightTriangleTop+triangleLength/2)+(headingHeight+headingMargin)*cnt+offset);
          pop();
        }
      }
      else{
        push();
        noStroke();
        fill('#a9a9a9');
        rect(width-leftHeading, headingTop+(headingHeight+headingMargin)*cnt, headingWidth, headingHeight+offset, headingR,headingR,headingR,headingR);
        pop();

        push();
        noStroke();
        fill('#FFFFFF');
        triangle(width-rightTriangleLeft, rightTriangleTop+(headingHeight+headingMargin)*cnt, width-(rightTriangleLeft-triangleLength), rightTriangleTop+(headingHeight+headingMargin)*cnt, width-(rightTriangleLeft-triangleLength/2), (rightTriangleTop+triangleLength)+(headingHeight+headingMargin)*cnt);
        pop();

        push();
        textFont(regularFont);
        textSize(bodyFontSize);
        textAlign(LEFT, TOP);
        textLeading(bodyFontSize+lead);
        fill('#FFFFFF');
        text(skillInfo[nodeName][key], width-bodyLeft, bodyTop+(headingHeight+headingMargin)*cnt, bodyWidth);
        pop();

        if(selectedDropdown == "About the Creator"){
          push();
          image(creatorImg, width - (completeButtonX+creatorImgWidth/2), bodyTop+(headingHeight+headingMargin)*cnt+offset-creatorImgHeight-imgMargin, creatorImgWidth, creatorImgHeight);
          pop();
        }

        reachedSelected = true;

        if(key == "Videos" || key == "Video Tutorials"){
          if (selectedNode != linkBoxIdx) {
            linkBoxes = [];
            linkList = [];
          }

          let amt = 0;
          let txt = skillInfo[nodeName][key];
          for(let i = 0; i < txt.length-5; i++){
            let keyword = "https";
            let ok = true;
            for(let j = i; j < i+5; j++){
              if(txt[j] != keyword[j-i]){
                ok = false;
              }
            }
            if(ok){
              amt++;
              let link = "";
              let ind = i;
              while(txt[ind] != "\n" && ind != txt.length){
                link += txt[ind];
                ind++;
              }
              if(selectedNode != linkBoxIdx){
                append(linkList, link);
              }
            }
          }

          for(let i = 0; i < amt; i++){
            // push();
            // stroke("#FFFFFF");
            // rect(width-450, 170+60*cnt+19*(5+4*i), 300, 19);
            // pop();
            textFont(regularFont);
            textSize(bodyFontSize);
            let linkWidth = textWidth(linkList[i]);
            if(selectedNode != linkBoxIdx){
              append(linkBoxes, [width-bodyLeft, bodyTop+(headingHeight+headingMargin)*cnt+(bodyFontSize+lead)*(4+3*i), linkWidth, bodyFontSize]);
            }
          }

          // for(let i = 0; i < linkBoxes.length; i++){
          //   push();
          //   stroke("#FFFFFF");
          //   rect(linkBoxes[i][0], linkBoxes[i][1], linkBoxes[i][2], linkBoxes[i][3]);
          //   pop();
          // }

          if(selectedNode != linkBoxIdx){
            linkBoxIdx = selectedNode;
          }
        }
      }
      
      if(!reachedSelected || key == selectedDropdown){
        push();
        textFont(headingFont);
        textSize(headingFontSize);
        textAlign(LEFT, CENTER);
        fill('#FFFFFF');
        text(key, width-bodyLeft, headingTop+headingHeight/2-headingMargin/2+(headingHeight+headingMargin)*cnt);
        pop();
      }
      else{
        push();
        textFont(headingFont);
        textSize(headingFontSize);
        textAlign(LEFT, CENTER);
        fill('#FFFFFF');
        text(key, width-bodyLeft, headingTop+headingHeight/2-headingMargin/2+(headingHeight+headingMargin)*cnt+offset);
        pop();
      }

      cnt++;
    }

    if(selectedNode != -1){
      push();
      noStroke();
      if(skillList[selectedNode].locked == true){
        fill('#D8181D');
      }
      else{
        fill('#449E48');
      }
      rect(width-leftHeading, height-completeButtonTop, headingWidth, completeButtonHeight, headingR,headingR,headingR,headingR);
      rect()
      pop();

      push();
      textFont(headingFont);
      textSize(headingFontSize);
      textAlign(CENTER, CENTER);
      fill('#FFFFFF');
      if(skillList[selectedNode].locked == true){
        if (selectedNode == 0) {
          text("Start CalisTree", width-completeButtonX, height-completeButtonY);
        }
        else if(selectedNode <= 3 || skillList[selectedNode].name == "Basic Handstand Shapes" || skillList[selectedNode].name == "Advanced Handstand Shapes"){
          text("Start Category", width-completeButtonX, height-completeButtonY);
        }
        else{
          text("Mark Skill as Completed", width-completeButtonX, height-completeButtonY);
        }
      }
      else{
        if(selectedNode == 0){
          text("Good Luck and Have Fun!", width-completeButtonX, height-completeButtonY);
        }
        else if(selectedNode <= 3 || skillList[selectedNode].name == "Basic Handstand Shapes" || skillList[selectedNode].name == "Advanced Handstand Shapes"){
          text("Category Started", width-completeButtonX, height-completeButtonY);
        }
        else{
          text("Skill Mastered", width-completeButtonX, height-completeButtonY);
        }
      }
      pop();
    }

    skillList[0].x = (width-leftSidebar)/2;
    skillList[0].y = height/2;
    // for(let i = 1; i < skillList.length; i++){ 
    //   if(skillList[i].locked == false || skillList[skillTree[i][0]].locked == false){
    //     let mnf = calcForce(i, 0, 0);
    //     let ang = atan2((skillList[i].y - skillList[skillTree[i][0]].y),(skillList[i].x - skillList[skillTree[i][0]].x));
    //     let dist = sqrt(pow(skillList[i].x - skillList[skillTree[i][0]].x, 2) + pow(skillList[i].y - skillList[skillTree[i][0]].y, 2));
    //     let d = 0;
    //     for(let j = -5; j <= 5; j += 10){
    //       let x2 = skillList[skillTree[i][0]].x + (dist+j)*cos(ang);
    //       let y2 = skillList[skillTree[i][0]].y + (dist+j)*sin(ang);
    //       let f = calcForce(i, x2 - skillList[i].x, y2 - skillList[i].y);
    //       if(mnf - f > 0.0000001){
    //         mnf = f;
    //         d = j;
    //       }
    //       // if(i == 5)
    //       //   console.log(f);
    //     }
    //     skillList[i].x = skillList[skillTree[i][0]].x + (dist+d)*cos(ang);
    //     skillList[i].y = skillList[skillTree[i][0]].y + (dist+d)*sin(ang);
    //     // console.log(mnf);
    //   }
    // }

    for(let i = 1; i < skillList.length; i++){
      if(skillList[i].locked == false || skillList[skillTree[i][0]].locked == false){
        dfs(i, skillTree[i][0]);

        let mnf = 0;
        for(let k = 0; k < branch.length; k++){
          mnf += calcForce(branch[k], 0, 0);
        }
        let d = 0;
        let ang = atan2((skillList[i].y - skillList[skillTree[i][0]].y), (skillList[i].x - skillList[skillTree[i][0]].x));
        for(let j = -5; j <= 5; j += 10){
          let f = 0;

          for(let k = 0; k < branch.length; k++){
            let x2 = skillList[branch[k]].x + j*cos(ang);
            let y2 = skillList[branch[k]].y + j*sin(ang);
            f += calcForce(branch[k], x2 - skillList[branch[k]].x, y2 - skillList[branch[k]].y);
          }

          if(mnf - f > 0.000001){
            mnf = f;
            d = j;
          }
        } 

        for(let k = 0; k < branch.length; k++){
          skillList[branch[k]].x = skillList[branch[k]].x + d*cos(ang);
          skillList[branch[k]].y = skillList[branch[k]].y + d*sin(ang);
        }
        // console.log(mnf);
        branch = [];
      }
    }

    // for(let i = 1; i < skillList.length; i++){
    //   if(skillList[i].locked == false || skillList[skillTree[i][0]].locked == false){
    //     let mnf = calcForce(i, 0, 0);
    //     let ang = atan2((skillList[i].y - skillList[skillTree[i][0]].y),(skillList[i].x - skillList[skillTree[i][0]].x));
    //     let dist = sqrt(pow(skillList[i].x - skillList[skillTree[i][0]].x, 2) + pow(skillList[i].y - skillList[skillTree[i][0]].y, 2));
    //     let d = 0;
    //     for(let j = -1; j <= 1; j += 2){
    //       let x2 = skillList[skillTree[i][0]].x + dist*cos(ang+j*Math.PI/180);
    //       let y2 = skillList[skillTree[i][0]].y + dist*sin(ang+j*Math.PI/180);
    //       let f = calcForce(i, x2 - skillList[i].x, y2 - skillList[i].y);
    //       if(mnf - f > 0.0000001){
    //         mnf = f;
    //         d = j;
    //       }
    //       // if(i == 5)
    //       //   console.log(f);
    //     } 
    //     skillList[i].x = skillList[skillTree[i][0]].x + dist*cos(ang+d*Math.PI/180);
    //     skillList[i].y = skillList[skillTree[i][0]].y + dist*sin(ang+d*Math.PI/180);  
    //     // console.log(mnf);
    //   }
    // }

    for(let i = 1; i < skillList.length; i++){
      if(skillList[i].locked == false || skillList[skillTree[i][0]].locked == false){
        dfs(i, skillTree[i][0]);
        // console.log(i, skillTree[i][0], branch);
        let mnf = 0;
        for(let k = 0; k < branch.length; k++){
          mnf += calcForce(branch[k], 0, 0);
        }
        let d = 0;
        for(let j = -5; j <= 5; j += 10){
          let f = 0;
          for(let k = 0; k < branch.length; k++){
            let ang = atan2((skillList[branch[k]].y - skillList[skillTree[i][0]].y), (skillList[branch[k]].x - skillList[skillTree[i][0]].x));
            let dist = sqrt(pow(skillList[branch[k]].x - skillList[skillTree[i][0]].x, 2) + pow(skillList[branch[k]].y - skillList[skillTree[i][0]].y, 2));
            let x2 = skillList[skillTree[i][0]].x + dist*cos(ang+j*Math.PI/180);
            let y2 = skillList[skillTree[i][0]].y + dist*sin(ang+j*Math.PI/180);
            f += calcForce(branch[k], x2 - skillList[branch[k]].x, y2 - skillList[branch[k]].y);
          }

          if(mnf - f > 0.000001){
            mnf = f;
            d = j;
          }
        } 

        for(let k = 0; k < branch.length; k++){
          let ang = atan2((skillList[branch[k]].y - skillList[skillTree[i][0]].y), (skillList[branch[k]].x - skillList[skillTree[i][0]].x));
          let dist = sqrt(pow(skillList[branch[k]].x - skillList[skillTree[i][0]].x, 2) + pow(skillList[branch[k]].y - skillList[skillTree[i][0]].y, 2));
          skillList[branch[k]].x = skillList[skillTree[i][0]].x + dist*cos(ang+d*Math.PI/180);
          skillList[branch[k]].y = skillList[skillTree[i][0]].y + dist*sin(ang+d*Math.PI/180);
        }
        // console.log(mnf);
        branch = [];
      }
    }

    // for(let i = 1; i < skillList.length; i++){
    //   console.log(skillList[i].x, skillList[i].y);
    // }
    // console.log(skillList.length);

    for(let u in skillTree){
      if(skillList[u].locked == false){
        for(let i = 0; i < skillTree[u].length; i++){
          drawConnection(skillList[u], skillList[skillTree[u][i]]);
        }
      }
    }

    if (selectedNode != -1) {
      push();
      stroke('#3D8C40');
      strokeWeight(nodeOutline);
      noFill();
      ellipse(skillList[selectedNode].x, skillList[selectedNode].y, 2 * skillList[selectedNode].r);
      pop();
    }

    for(let i = 0; i < skillList.length; i++){
      if(skillList[i].locked == false || skillList[skillTree[i][0]].locked == false || i == 0){
        skillList[i].drawNode();
      }
    }

    if(releaseConfetti){
      let ok = false;
      for(let i = 0; i < confetti.length; i++){
        confetti[i].confettiDisplay();
        // console.log(confetti[i].y);
        if(confetti[i].y < height){
          ok = true;
        }
      }
      if(!ok){
        releaseConfetti = false;
        for (let i = 0; i < 300; i++) {
          confetti[i] = new Confetti(random(0, width), random(-height, 0), random(-1, 1));
        }
      }
    }
  }
  catch(err){
    console.log(err);
    push();
    fill("#FFFFFF");
    rect(0,0, width,height);
    pop();
  }
}

// function windowResized() {
//   for(let i = 0; i < skillList.length; i++){
//     skillList[i].x *= windowWidth/width;
//     skillList[i].y *= windowHeight/height;
//     skillList[i].r = min(skillList[i].r*windowWidth/width, skillList[i].r*windowHeight/height);
//   }
//   connectionDist *= min(windowWidth/width, windowHeight/height);
//   leftSidebar *= windowWidth/width;
//   sidebarWidth *= windowWidth/width;
//   topSidebar *= windowHeight/height;
//   sidebarHeight *= windowHeight/height;
//   sidebarR *= min(windowWidth/width, windowHeight/height);
//   titleFontSize *= min(windowWidth/width, windowHeight/height);
//   titleTop *= windowHeight/height;
//   infoFontSize *= min(windowWidth/width, windowHeight/height);
//   infoCoord *= windowHeight/height;
//   leftHeading *= windowWidth/width;
//   headingWidth *= windowWidth/width;
//   headingTop *= windowHeight/height;
//   headingHeight *= windowHeight/height;
//   headingMargin *= windowHeight/height;
//   headingFontSize *= min(windowWidth/width, windowHeight/height);
//   headingR *= min(windowWidth/width, windowHeight/height);
//   rightTriangleLeft *= windowWidth/width;
//   rightTriangleTop *= windowHeight/height;
//   triangleLength *= windowHeight/height;
//   bodyLeft *= windowWidth/width;
//   bodyTop *= windowHeight/height;
//   bodyWidth *= windowWidth/width;
//   bodyFontSize *= (windowWidth*windowHeight)/(width*height);
//   nodeOutline *= windowHeight/height;
//   completeButtonTop *= windowHeight/height;
//   completeButtonHeight *= windowHeight/height;
//   completeButtonX *= windowWidth/width;
//   completeButtonY *= windowHeight/height;

//   width = windowWidth;
//   height = windowHeight;
//   resizeCanvas(windowWidth, windowHeight);
// }