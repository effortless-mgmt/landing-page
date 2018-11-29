console.log("Testing 123");

test("https://api.effortless.dk/api/values", "production");
test("https://staging.effortless.dk/api/values", "staging");
function test(url, field) {
    fetch(url).then(res => {
        if (res.status != 200) {
            document.getElementById(field + "-server").innerHTML = "<a href='" + url + "' target='_blank'><img src='https://img.shields.io/badge/" + field + "-failed-red.svg'></a>"
        } else {
            return res.json()
        }
    }).then(json => {
        let isCorrect = true;

        if (json.length != 2) {
            isCorrect = false;
        } else {
            if (json[0] != "value1") {
                isCorrect = false;
            }
            if (json[1] != "value2") {
                isCorrect = false;
            }
        }

        if (isCorrect) {
            document.getElementById(field + "-server").innerHTML = "<a href='" + url + "' target='_blank'><img src='https://img.shields.io/badge/" + field + "-running-brightgreen.svg'></a>"
        } else {
            document.getElementById(field + "-server").innerHTML = "<a href='" + url + "' target='_blank'><img src='https://img.shields.io/badge/" + field + "-failed-red.svg'></a>"
        }
    });
}
