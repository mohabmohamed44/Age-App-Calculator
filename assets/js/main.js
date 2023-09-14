$(document).ready(function () {
    const inputs = $(".input input");
    const errorMessages = $(".input .error");

    inputs.eq(0).on('input', function (event) {
        let value = event.target.value;
        if (value < 30) {
            if (value == 0) {
                value = 1;
            }
            value = value;
        } else if (value > 30) {
            value = 30;
        }
        event.target.value = value;
    });

    inputs.eq(1).on('input', function (event) {
        let value = event.target.value;
        if (value == 0) {
            value = 1;
        }
        if (value < 12) {
            value = value;
        } else if (value > 12) {
            value = 12;
        }
        event.target.value = value;
    });

    inputs.eq(2).on('input', function (event) {
        let value = event.target.value;
        if (value == 0) {
            value = 1;
        }
        const currentYear = new Date().getFullYear();
        if (value < 2022) {
            value = value;
        } else if (value > currentYear) {
            value = currentYear;
        }
        event.target.value = value;
    });

    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    console.log(year);

    function calculateAge(birthdate) {
        const now = new Date();
        const birth = new Date(birthdate);

        let age = {};

        let yearDiff = now.getFullYear() - birth.getFullYear();
        let monthDiff = now.getMonth() - birth.getMonth();
        let dayDiff = now.getDate() - birth.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            yearDiff--;
            monthDiff += 12;
        }

        let daysInLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        if (dayDiff < 0) {
            dayDiff += daysInLastMonth;
            monthDiff--;
        }

        let totalDays = ((yearDiff * 365) + (monthDiff * daysInLastMonth) + dayDiff);
        age.years = Math.floor(totalDays / 365);
        totalDays = totalDays % 365;
        age.months = Math.floor(totalDays / daysInLastMonth);
        totalDays = totalDays % daysInLastMonth;
        age.days = totalDays;

        return age;
    }

    const years = $("#years");
    const months = $("#months");
    const days = $("#days");
    const button = $("#button");

    button.on('click', function () {
        let isEmpty = false;
        inputs.each(function () {
            if ($(this).val().trim() === '') {
                isEmpty = true;
                $(this).next().html("Please enter a number");
                $(this).css("border", "1px solid red");
            }
        });
        if (!isEmpty) {
            inputs.each(function () {
                $(this).next().html("");
                $(this).css("border", "1px solid #ececec");
            });
            const birthdate = `${inputs.eq(2).val()}-${inputs.eq(1).val()}-${inputs.eq(0).val()}`;
            const age = calculateAge(birthdate);
            years.html(age.years);
            months.html(age.months);
            days.html(age.days);
        }
    });
});
