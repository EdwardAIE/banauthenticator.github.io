const silage_density = 200;
const grain_density = 750;
const woodchip_density = 380;
const water_density = 997;

const pi = Math.pi;

//Max height 20 metres
//min heght 3 metres

//Conical bottom
//flat bottom

//Customer Preference Input Objects
const customer_silo_quantity_input = document.getElementById("SiloQuantity");
const customer_grain_type_input = document.getElementById("GrainType");
const customer_grain_quantity_input = document.getElementById("GrainQuantity");
const customer_grain_unit_input = document.getElementById("GrainQuantityUnit");
const customer_budget_input = document.getElementById("CustomerBudget");



//Silo Details Output Objects



//Script for collapsable tabs
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


function recommend()
{
alert("bUtton Clicked");

}

//var canvas = document.getElementById("canvas");
//const ctx = canvas.getContext("2d");
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

class Silo {
    constructor() {
        this.silo_quantity = 1;
        this.silo_type = "tower silo";
        this.silo_material = "tin";
        this.height = 10.0;
        this.diameter = 6.0; 

        //takes customer recomendations
        recommend()
        {

        }

        //Return to Default Settings
        def()
        {


        }

        find_domed_silo_volume(vheight, vdiameter)
        {
            vdome = (4/3) * Math.pi * (1/8) * vdiameter * vdiameter * vdiameter;
            vshaft = (vheight - (vdiameter* 0.5))*Math.pi*0.25*vdiameter*vdiameter;
            volume = vdome + vshaft;
            return volume;
        }

        find_capacity(grain_type, grain_unit)
        {

        }

        update_parameters()
        {


        }

        save_cookies()
        {


        }
    }
}

class Customer{
    constructor() {
        this.silo_quantity;
        this.grain_type;
        this.grain_amount;
        this.grain_unit;
        this.budget;
        this.distance;
    }

    save_cookies()
        {

            
        }

}

class Cost{
    constructor() {
        this.silo_quantity;
        this.grain_type;
        this.grain_amount;
        this.grain_unit;
        this.budget;
        this.distance;
    }

    save_cookies()
        {

            
        }

}