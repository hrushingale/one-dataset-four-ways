

function showDataInConsole(data){
  // console.clear();
  console.log(data);
  console.table(data);  
}

const Chart = window.Chart;

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function injectHTML(list) {
  console.log('fired injectHTML');
  const target = document.querySelector('#timings');
  target.innerHTML = '';
  list.forEach((item) => {
    let d=new Date(0);
    d.setUTCSeconds(item.y);
    const str = `<li>${item.x}<br><p> ${formatAMPM(d)}</p> </li>`;
    target.innerHTML += str;
  });
  
}

function showBubbleChart(originalData){
  

  const data = originalData.map(function(element){
    return {x: element.name, y: element.maxDiameter, r:element.maxDiameter*50};
  });
                                
// console.log(data);

  const labels = data.map(item => item.x);
  const values = data.map(item => item.y);
  const radii = data.map(item => item.r);


    const context = document.querySelector('#asteroidSize');
    const bubbleChart = new Chart(context, {
        type: 'bubble',
      
        data: {
            labels: labels,
            datasets: [{
                label: 'Size of Asteroid',
                data: data,
                backgroundColor: '#ffd700', // Bubble color
            }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
            plugins: {
              tooltip:{
                 backgroundColor: '#000000',
                displayColors: false,
                borderColor: '#ffd700',
                borderWidth: 2,
                titleFont: {
                 family: 'Gabarito',
                  weight: 600,
                },
                
                titleSpacing: 3,
                bodyFont: {
                  family: 'Gabarito',
                  weight: 600,
                },
                bodyColor: '#ffd700',
                titleColor: 'white',
                callbacks: {
                  label: function(item){
                   return item.parsed.y.toFixed(2)+' mi';
                  },
              },
                
                
              },
            legend: {
              display:false,
                labels: {
                  
                    color: "white",
                    // This more specific font property overrides the global property
                    font: {
                        size: 14,
                      family: 'Gabarito'
                    },
                }
            }
        },
           
            scales: {
                x: {
                  grid: {
                    color: 'gray',
                    // borderColor: 'green'
                  },
                  offset: true,
                  ticks:{
                    color:'white',
                    font: {
                          size: 14,
                        family: 'Gabarito'
                      },
                  },
                    type: 'category', // Use categories for X-axis
                    title: {
                        display: true,
                        text: 'Asteroid Name',
                      color:'white',
                      font: {
                          size: 14,
                        family: 'Gabarito'
                      },
                    }
                },
                y: {
                  offset: true,
                  // grid: {
                  //   color: 'grey',
                  // },
                  ticks:{
                    color:'white',
                    
                    font: {
                          size: 14,
                        family: 'Gabarito'
                      },
                  },
                  max:1,
                  
                    title: {
                      color:'white',
                        display: true,
                        text: 'Diameter (miles)',
                        font: {
                          size: 14,
                        family: 'Gabarito'
                      },
                    },
                  
                  
                }
            }
        },
      color:'white',
  });
  

}

function showBarChart(originalData){
  const data = originalData.map(function(element){
    return {x: element.name, y: Number(element.relativeVelocity)};
  });
  const labels = data.map(item => item.x);
  const values = data.map(item => item.y.toFixed(2));

      const context = document.querySelector('#asteroidSpeed');

  

  let delayed;
  const barChart = new Chart(context, {
        type: 'bar',
      
        data: {
            labels: labels,
          
            datasets: [{
              
              axis: 'y',
                
                  // fill: false,

                label: 'Speed of Asteroid',
                data: values,
                backgroundColor: '#ffd700', // Bubble color
            }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          barPercentage: 1,
          // borderColor: 'white',
          // borderWidth: 2,
          // borderRadius: 10,
          hoverBorderRadius: 20,
           animation: {
              onComplete: () => {
                delayed = true;
              },
              delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                  delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
              },
    },
           indexAxis: 'y',
            
          
            plugins: {
              
                deferred: {
                xOffset: 150,   // defer until 150px of the canvas width are inside the viewport
                yOffset: '50%', // defer until 50% of the canvas height are inside the viewport
                delay: 500      // delay of 500 ms after the canvas is considered inside the viewport
              },
              tooltip:{
                backgroundColor: '#000000',
                displayColors: false,
                borderColor: '#ffd700',
                borderWidth: 2,
                titleFont: {
                 family: 'Gabarito',
                  weight: 600,
                },
                
                titleSpacing: 3,
                bodyFont: {
                  family: 'Gabarito',
                  weight: 600,
                },
                bodyColor: '#ffd700',
                titleColor: 'white',
                callbacks: {
                  label: function(item){
                   return item.parsed.x.toFixed(2)+' mi/hr';
                  },
              },
                
                
              },
            legend: {
              display: false,
                labels: {
                  
                    color: "white",
                    // This more specific font property overrides the global property
                    font: {
                        size: 14,
                      family: 'Gabarito'
                    },
                }
            }
        },
           
            scales: {
                x: {
                  // grid: {
                  //   color: 'red',
                  //   borderColor: 'green'
                  // },
                  offset: true,
                  ticks:{
                    color:'white',
                    font: {
                          size: 14,
                        family: 'Gabarito'
                      },
                  },
                    // type: 'category', // Use categories for X-axis
                    title: {
                        display: true,
                        text: 'Speed (mi/hr)',
                      color:'white',
                      font: {
                          size: 14,
                        family: 'Gabarito'
                      },
                    },
                  
                },
                y: {
                  
                  offset: true,
                  // grid: {
                  //   color: 'red',
                  //   borderColor: 'green'
                  // },
                  ticks:{
                    color:'white',
                    
                    font: {
                          size: 14,
                        family: 'Gabarito'
                      },
                  },
                  
                    title: {
                      color:'white',
                        display: true,
                        text: 'Asteroid Name',
                        font: {
                          size: 14,
                        family: 'Gabarito'
                      },
                    },
                  
                  
                }
            }
        },
      color:'white',
  });
}
function showPolarAreaChart(originalData){
  const data = originalData.map(function(element){
    return {x: element.name, y: element.brightness_magnitude};
  });
  console.log(data);
   const context = document.querySelector('#asteroidBrightness');

   const labels = data.map(item => item.x);
  let values = data.map(item => item.y);
  values=values.sort((a,b)=>a-b);
  console.log(values);
  let factor=1/values.length;
  console.log("factor:"+factor);
  let i=0;
  const bgColor=values.map(item=>`rgba(255, 215, 0, ${i=i+factor})`);
  console.log(bgColor);
  const polarAreaChart = new Chart(context, {
        type: 'polarArea',
      
        data: {
            labels: labels,
          
            datasets: [{           
             
                

                label: 'Brightness of Asteroid',
                data: values,
                backgroundColor: bgColor, // Bubble color
            }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          r: {
            pointLabels: {
              display: true,
              centerPointLabels: true,
              font: {
                size: 18
              }
            }
          },
          
            plugins: {
              tooltip:{
                                 backgroundColor: '#000000',
                displayColors: false,
                borderColor: '#ffd700',
                borderWidth: 2,
                titleFont: {
                 family: 'Gabarito',
                  weight: 600,
                },
                
                titleSpacing: 3,
                bodyFont: {
                  family: 'Gabarito',
                  weight: 600,
                },
                bodyColor: '#ffd700',
                titleColor: 'white',
                callbacks: {
                  label: function(item){
                   console.log(item);
                  },
              },
                
                
              },
            legend: {
                labels: {
                  
                    color: "white",
                    // This more specific font property overrides the global property
                    font: {
                        size: 14,
                      family: 'Gabarito'
                    },
                }
            }
        },
           

        },
      color:'white',
  });
}

function showLineChart(originalData){
  
  
  
  
  const data = originalData.map(function(element){
    
    let d=new Date(0);
    d.setUTCSeconds(element.approachTime);
    
    return {x: element.name, y: element.approachTime, ampm:formatAMPM(d)};
  });

  
  
  console.log(data);
  injectHTML(data);
  
  const totalDuration = 10000;
const delayBetweenPoints = totalDuration / data.length;
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) :
  ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }
};

  const context = document.querySelector('#asteroidTime');

  const labels = data.map(item => item.x);
  let time = data.map(function(item){
    let d=new Date(0);
    d.setUTCSeconds(item.y);
    return (d.getHours()+(d.getMinutes()/60));
    
  });
  // time=time.sort((a,b)=>a-b);
  console.log(time);
  // console.log(data);
  const lineChart = new Chart(context, {
        type: 'line',
      
        data: {
            labels: labels,
            datasets: [{
                    cubicInterpolationMode: 'monotone',
                    tension: 0.1,
                    borderColor: 'grey',

                    label: 'Incoming Time',
                    data: time,
                    backgroundColor: '#ffd700', // Bubble color
            }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          pointRadius: 10,
          animations: animation,
            plugins: {
              tooltip:{
                                 backgroundColor: '#000000',
                displayColors: false,
                borderColor: '#ffd700',
                borderWidth: 2,
                titleFont: {
                 family: 'Gabarito',
                  weight: 600,
                },
                
                titleSpacing: 3,
                bodyFont: {
                  family: 'Gabarito',
                  weight: 600,
                },
                bodyColor: '#ffd700',
                titleColor: 'white',
                callbacks: {
                  label: function(item){
                    var num=item.raw%1;
                    return String(Math.floor(item.raw)).padStart(2,'0')+':'+String(Math.ceil(num*60)).padStart(2,'0');
                  },
              },
                
                
              },
            legend: {
              display: false,
                labels: {
                  
                    color: "white",
                    // This more specific font property overrides the global property
                    font: {
                        size: 14,
                      family: 'Gabarito'
                    },
                }
            }
        },
           interaction: {
      intersect: false,
    },
            scales: {
                x: {
                  // grid: {
                  //   color: 'red',
                  //   borderColor: 'green'
                  // },
                  offset: true,
                  ticks:{
                    color:'white',
                    font: {
                          size: 14,
                        family: 'Gabarito'
                      },
                  },
                    type: 'category', // Use categories for X-axis
                    title: {
                        display: true,
                        text: 'Asteroid Name',
                      color:'white',
                      font: {
                          size: 14,
                        family: 'Gabarito'
                      },
                    }
                },
                y: {
                  offset: true,
                  // grid: {
                  //   color: 'gray',
                  // },
                  ticks:{
                    color:'white',
                    
                    font: {
                          size: 14,
                        family: 'Gabarito'
                      },
                  },
                  min: 0,
                  max: 24,
                  
                    title: {
                      color:'white',
                        display: true,
                        text: 'Time (24-hr)',
                        font: {
                          size: 14,
                        family: 'Gabarito'
                      },
                    },
                  
                  
                }
            }
        },
      color:'white',
  });
  
  
  
}


async function mainEvent(){

   const trial="https://collectionapi.metmuseum.org/public/collection/v1/objects/2";
  
  const results1=await fetch(trial);
    const arrayFromJson1=await results1.json();
  console.table(arrayFromJson1);

  console.table(trial);
  
  const API_KEY='q2xUGLYmDe9zrDTru4ZEbOng9keQpnoTqCG97WKk';
  const today=new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = String(today.getFullYear());
  const START_DATE=yyyy+'-'+mm+"-"+dd;
  const dateDisplay = document.querySelector("#todayData");
  dateDisplay.innerHTML = "&ensp;"+today.toLocaleString('default');
  console.log("Date:"+ yyyy+'-'+mm+"-"+dd);
  const apiUrl=`https://api.nasa.gov/neo/rest/v1/feed?start_date=${START_DATE}&end_date=${START_DATE}&api_key=${API_KEY}`;
  const results=await fetch(apiUrl);
  const arrayFromJson=await results.json();
  let nearEarthObjects=arrayFromJson.near_earth_objects[START_DATE];
  let filteredData=[]; 

  
  //object.name, object.absolute_magnitude_h, 
  //object.close_approach_data[0].relative_velocity.miles_per_hour
  //object.close_approach_data[0].close_approach_date_full
  //object.is_potentially_hazardous_asteroid
  //object.is_sentry_object
  //object.estimated_diameter.miles.estimated_diameter_min
  //object.estimated_diameter.miles.estimated_diameter_max
  console.log(nearEarthObjects);

  for(let object of nearEarthObjects){
    filteredData.push(
    {
      name:object.name,
      brightness_magnitude:object.absolute_magnitude_h,
      minDiamater:object.estimated_diameter.miles.estimated_diameter_min,
      maxDiameter:object.estimated_diameter.miles.estimated_diameter_max,
      relativeVelocity: object.close_approach_data[0].relative_velocity.miles_per_hour,
      // approachTime: object.close_approach_data[0].close_approach_date_full.split(" ").pop()
      approachTime: object.close_approach_data[0].epoch_date_close_approach

      
      
    }
    
    );
  }
  showDataInConsole(filteredData);
  showBubbleChart(filteredData);
  showBarChart(filteredData);
  showPolarAreaChart(filteredData);
  showLineChart(filteredData);
  
  
    
}

mainEvent();





// ----- GLITCH STARTER PROJECT HELPER CODE -----

// Open file when the link in the preview is clicked
let goto = (file, line) => {
  window.parent.postMessage(
    { type: "glitch/go-to-line", payload: { filePath: file, line: line } }, "*"
  );
};
// Get the file opening button from its class name
const filer = document.querySelectorAll(".fileopener");
filer.forEach((f) => {
  f.onclick = () => { goto(f.dataset.file, f.dataset.line); };
});
