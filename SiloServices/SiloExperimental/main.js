var coll = document.getElementsByClassName("collapsible");

var i;
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}







var canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
/*
var Dhalflife_box = document.getElementById('Dhalflife_box');
Dhalflife_set = true;
var PMotion_box = document.getElementById('PMotion_box');
PMotion_set = true;

var AirRes_box = document.getElementById('AirRes_box');
AirRes_set = true;
var Inertia_box = document.getElementById('Inertia_box');
Inertia_set = true;


*/

//coefficients
var user_origin_x = 5;
var user_origin_y = 500;

var user_position_variance = 5;

var user_angle = 30;

var user_min_velocity = 0.5;
var user_max_velocity = 2;
var user_min_diameter = 5;
var user_max_diameter = 20;


var user_time_multiplier = 1;
var user_pixels_per_meter = 500;

var user_drag_coefficient = 1;



class Particle {
    constructor(x, y, initial_velocity, initial_angle, initial_diameter) {
        this.x = x;
        this.y = y;
        this.initial_diameter = initial_diameter;
        this.initial_velocity = initial_velocity;
        this.initial_angle = initial_angle;
        this.diameter = initial_diameter;

        //Coefficients to tweek
        this.time_multiplier = (1 / 60) * user_time_multiplier;
        this.gravity_acceleration_coefficient = 9.81 * user_pixels_per_meter;
        this.diameter_halflife_coefficient = 0.2;
        this.diameter_threshold = 3;

        //Important Private Physics Variables
        this.x_acceleration = 0;
        this.y_acceleration = 0;
        this.x_velocity = Math.cos(this.initial_angle) * this.initial_velocity * this.time_multiplier * user_pixels_per_meter;
        this.y_velocity = Math.sin(this.initial_angle) * this.initial_velocity * this.time_multiplier * user_pixels_per_meter;






    }

    update() {
        //Update Diameter
        //this.diameter = this.diameter * (0.5) ^ (0.5 / this.diameter_halflife_coefficient);

        //Acceleration Vector

        //Start With Gravity (Meters per Frame)
        this.y_acceleration = (this.gravity_acceleration_coefficient * this.time_multiplier * this.time_multiplier);

        //Add Air Resistance

        /*
        this.x_air_resistance = 0
        this.y_air_resistance =  0
            
        if(this.x_velocity!=0){
        this.x_air_resistance = -1*(2 * 0.47 / ( 1.255 * this.x_velocity^2 * (Math.PI * ((this.diameter*1)/2)^2)))/1;
        }

        if(this.x_velocity!=0){
        this.y_air_resistance = -1*(2 * 0.47 / ( 1.255 * this.y_velocity^2 * (Math.PI * ((this.diameter*1)/2)^2)))/1
        }

        console.log("X_Air_Resistance: " + this.x_air_resistance + "    Y_Air_Resistance: " + this.y_air_resistance + "")
        this.x_acceleration = this.x_acceleration + this.x_air_resistance;
        this.y_acceleration = this.y_acceleration + this.y_air_resistance;
        */


        //Acceleration to Velocity to Displacement
        this.y_velocity = this.y_velocity + this.y_acceleration;
        this.y = this.y + this.y_velocity;
        this.x_velocity = this.x_velocity + this.x_acceleration;
        this.x = this.x + this.x_velocity;

    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.diameter / 2, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        /*
        if (this.diameter < this.diameter_threshold) {
            ctx.fillStyle = "red";
        }
        */
        ctx.fill();
        ctx.restore();
    }
}

class Grid {
    constructor(canvas_x_size, canvas_y_size, square_size, color) {
        this.canvas_x_size = canvas_x_size;
        this.canvas_y_size = canvas_y_size;
        this.square_size = square_size;
        this.color = color;

        this.notch_width = 2;
    }

    draw(ctx) {
        ctx.beginPath();
        for (let i = 0; i < (this.canvas_x_size + 1); i++) {
            ctx.moveTo(i * this.square_size, 0);
            ctx.lineTo(i * this.square_size, this.canvas_y_size);
        }

        for (let i = 0; i < (this.canvas_x_size + 1); i++) {
            ctx.moveTo(0, i * this.square_size);
            ctx.lineTo(this.canvas_x_size, i * this.square_size);
        }



        ctx.strokeStyle = this.color;
        ctx.stroke();
    }

}

//updateBoxes();

number_of_particles = 50;
const grid = new Grid(5000, 5000, user_pixels_per_meter, '#666666');
let ParticleArray = [];
for (let i = 0; i < number_of_particles; i++) {
    ParticleArray.push(new Particle(getRandomFloat(0, 10), getRandomFloat(245, 255), getRandomFloat(10, 20), getRandomFloat(Math.PI / 6, -Math.PI / 6), getRandomFloat(50, 100)));
}

Start();
animate();

function Start() {

    ParticleArray = [];
    for (let i = 0; i < number_of_particles; i++) {
        ParticleArray.push(
            new Particle(
                getRandomFloat(user_origin_x - user_position_variance, user_origin_x + user_position_variance),
                getRandomFloat(user_origin_y - user_position_variance, user_origin_y + user_position_variance),
                getRandomFloat(user_min_velocity, user_max_velocity),
                getRandomFloat(degrees_to_radians(user_angle), -degrees_to_radians(user_angle)),
                getRandomFloat(user_min_diameter, user_max_diameter)
            )
        );
    }

}

function animate() {
    canvas.width = 5000;
    canvas.height = 5000;

    /*
    for (let i = 0; i < number_of_particles; i++)
    {
        ParticleArray[i].update(); 
        ParticleArray[i].draw(ctx);
        
        if(ParticleArray[i].y>5000)
        {
            ParticleArray.splice(i, 1);
            number_of_particles = number_of_particles - 1;
        }
        console.log("Number of particals:" + number_of_particles + "Particle y:" + ParticleArray[i].y +""); 
    }
    */

    /*
    for (const element of ParticleArray)
    {
        element.update(); 
        element.draw(ctx);
        console.log("Number of particals:" + ParticleArray.length + "Particle y:" + ParticleArray[i].y +""); 
    }
    */

    //ParticleArray.push(new Particle(getRandomFloat(0, 10),getRandomFloat(245, 255),getRandomFloat(10, 20),getRandomFloat(Math.PI/6, -Math.PI/6),getRandomFloat(50, 100)));
    grid.draw(ctx);
    ParticleArray.forEach(q => q.update());
    ParticleArray.forEach(q => q.draw(ctx));
    requestAnimationFrame(animate);
}

//Handy Math Functions
function getRandomFloat(min, max) {
    const float = (Math.random() * (max - min) + min);

    return float;
}

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}


/*
function changeInput(type) {

    switch (type) {
        case 1:
            Dhalflife_set = !Dhalflife_set;
            break;
        case 2:
            PMotion_set = !PMotion_set;
            break;
        case 3:
            AirRes_set = !AirRes_set;
            break;
        case 4:
            Inertia_set = !Inertia_set;
            break;
        default:
            break;
    }
    updateBoxes();
}

function updateBoxes() {
    Dhalflife_box.checked = Dhalflife_set;
    PMotion_box.checked = PMotion_set;
    AirRes_box.checked = AirRes_set;
    Inertia_box.checked = Inertia_set;
}
*/