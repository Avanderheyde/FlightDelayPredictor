var dayofweek_ ,day_, month_,dep_,arr_,elap_;

$(document).ready(function(){
  // fetch all DOM elements for the input
  dayofweek_ = document.getElementById("dayofweek");
  day_ = document.getElementById("day");
  month_ = document.getElementById("month");
  dep_ = document.getElementById("dep");
  arr_ = document.getElementById("arr");
  elap_ = document.getElementById("elap");
})

$(document).on('click','#submit',function(){
    // on clicking submit fetch values from DOM elements and use them to make request to our flask API
    var dayofweek = dayofweek_.value;
    var day = day_.value;
    var month = month_.value;
    var dep = dep_.value;
    var arr = arr_.value;
    var elap = elap_.value;
    if(dayofweek == "" || day == "" || month == "" || dep == "" || arr == "" || elap = ""){
      // you may allow it as per your model needs
      // you may mark some fields with * (star) and make sure they aren't empty here
      alert("empty fields not allowed");
    }
    else{
      // replace <username> with your pythonanywhere username
      // also make sure to make changes in the url as per your flask API argument names
      var requestURL = "https://avanderheyde.pythonanywhere.com/?dayofweek="+dayofweek+"&day="+day+"&month="+month+"&month="+dep+"&month="+arr+"&month="+elap
      console.log(requestURL); // log the requestURL for troubleshooting
      $.getJSON(requestURL, function(data) {
        console.log(data); // log the data for troubleshooting
        prediction = data['prediction'];
      });
      // following lines consist of action that would be taken after the request has been read
      // for now i am just changing a <h2> tag's inner html using jquery
      // you may simple do: alert(prediction);
      $(".result").html("Prediction is:" + prediction);
    }
  });