$("#sendFolder").click(function (e) {
    e.preventDefault();

    PrintFolder($("#folder").val());
});

function PrintFolder(filePrompt) {
    $("#content").attr("id", "tree");
    var actualFolder = filePrompt.substr(filePrompt.lastIndexOf("/") + 1);
    $.ajax({
        type: "GET",
        url: "readFolder.php",
        data: {
            filePrompt: filePrompt,
        },
        success: function (data) {
            $("#tree").html(
                "<tr><td id='actualFolder' class='folder'>&larr; " +
                    actualFolder +
                    "</td><th id='name'>Nom</th><th id='date'>Date de modification</th><th id='size'>Taille</th></tr>" +
                    data
            );
            for (let i = 0; i < $(".folder").length; i++) {
                $(".folder")
                    .eq(i)
                    .on("click", function () {
                        if ($(".folder").eq(i).attr("id") == "actualFolder") {
                            PrintFolder(
                                filePrompt.substr(
                                    0,
                                    filePrompt.lastIndexOf("/")
                                )
                            );
                        }
                    });
            }

            for (let i = 0; i < $("i").length; i++) {
                $("i")
                    .eq(i)
                    .on("click", function () {
                        $("#colorPicker").html(
                            "<label id='picker_name' for='colorpick'>Selectionnez la couleur du Logo : </label><input name='colorpick' type='color' id='color' value='#000000'>"
                            );
                        $("#colorPicker").attr("title", "Color Picker");
                        $("#colorPicker").dialog({
                            buttons: [
                                {
                                    text: "Choisir",
                                    icon: "ui-icon-check",
                                    click: function () {
                                        var color = $("#color").val();
                                        $("i").eq(i).css("color", color);
                                        $('#picker_name').css(
                                            "display", 
                                            "none"
                                        )
                                        $("#color").css(
                                            "display",
                                            "none"
                                        );
                                        $(this).dialog("destroy");
                                    },
                                },
                            ],
                        });
                    });
            }

            for (let i = 0; i < $(".name").length; i++) {
                $(".name")
                    .eq(i)
                    .on("click", function () {
                        if ($(".name").eq(i).attr("class") == "folder name") {
                            PrintFolder(
                                filePrompt + "/" + $(".name").eq(i).attr("id")
                            );
                        } else {
                            var file = $(".name").eq(i).attr("id");
                            file = file.replace("_", ".");
                            DisplayFiles(filePrompt + "/" + file);
                        }
                    });
            }

            for (let i = 0; i < $("th").length; i++) {
                var alreadySort = false;

                $("th")
                    .eq(i)
                    .on("click", function () {
                        var id = $("th").eq(i).attr("id");

                        var list = [];

                        for (let i = 0; i < $(".name").length; i++) {
                            list.push([
                                $(".icon").eq(i).html(),
                                $(".name").eq(i).html(),
                                $(".date").eq(i).html(),
                                $(".size").eq(i).html(),
                                $(".size").eq(i).attr("size"),
                                $(".name").eq(i).attr("id"),
                                $(".name").eq(i).attr("class"),
                            ]);
                        }

                        switch (id) {
                            case "name":
                                if (alreadySort == false) {
                                    list = list.sort(function (a, b) {
                                        if (a[1] < b[1]) return -1;
                                        if (a[1] > b[1]) return 1;
                                        return 0;
                                    });
                                    alreadySort = true;
                                } else {
                                    list = list.sort(function (a, b) {
                                        if (a[1] < b[1]) return 1;
                                        if (a[1] > b[1]) return -1;
                                        return 0;
                                    });
                                    alreadySort = false;
                                }

                                for (let i = 0; i < list.length; i++) {
                                    $(".icon").eq(i).html(list[i][0]);
                                    $(".name")
                                        .eq(i)
                                        .html(list[i][1])
                                        .attr("id", list[i][5])
                                        .attr("class", list[i][6]);
                                    $(".date").eq(i).html(list[i][2]);
                                    $(".size")
                                    .eq(i)
                                    .html(list[i][3])
                                    .html(list[i][4]);
                                }
                                break;

                            case "date":
                                if (alreadySort == false) {
                                    list = list.sort(function (a, b) {
                                        var dt1 = Date.parse(a[2]);
                                        var dt2 = Date.parse(b[2]);

                                        if (dt1 < dt2) return -1;
                                        if (dt1 > dt2) return 1;
                                        return 0;
                                    });
                                    alreadySort = true;
                                } else {
                                    list = list.sort(function (a, b) {
                                        var dt1 = Date.parse(a[2]);
                                        var dt2 = Date.parse(b[2]);

                                        if (dt1 < dt2) return 1;
                                        if (dt1 > dt2) return -1;
                                        return 0;
                                    });
                                    alreadySort = false;
                                }

                                for (let i = 0; i < list.length; i++) {
                                    $(".icon").eq(i).html(list[i][0]);
                                    $(".name")
                                        .eq(i)
                                        .html(list[i][1])
                                        .attr("id", list[i][5])
                                        .attr("class", list[i][6]);
                                    $(".date").eq(i).html(list[i][2]);
                                    $(".size")
                                        .eq(i)
                                        .html(list[i][3])
                                        .attr("size", list[i][4]);
                                }
                                break;

                            case "size":
                                if (alreadySort == false) {
                                    list = list.sort(function (a, b) {
                                        return a[4] - b[4];
                                    });
                                    alreadySort = true;
                                } else {
                                    list = list.sort(function (a, b) {
                                        return b[4] - a[4];
                                    });
                                    alreadySort = false;
                                }

                                for (let i = 0; i < list.length; i++) {
                                    $(".icon").eq(i).html(list[i][0]);
                                    $(".name")
                                        .eq(i)
                                        .html(list[i][1])
                                        .attr("id", list[i][5])
                                        .attr("class", list[i][6]);
                                    $(".date").eq(i).html(list[i][2]);
                                    $(".size")
                                        .eq(i)
                                        .html(list[i][3])
                                        .html(list[i][4]);
                                }
                                break;

                            default:
                              alert("Y a peut-etre un soucis Monsieur");
                                break;
                        }
                    });
            }
        },
    });
}

function DisplayFiles(file) {
    $.ajax({
        type: "GET",
        url: "readFile.php",
        data: {
            file: file,
        },
        success: function (data) {
            $(".apercu").html(data);
            $(".apercu").css("display", "block");
            $(".apercu").css("border", "1px solid black");
            $(".apercu").css("padding", "10px");
            $(".apercu").css("background-color", "white");
            $(".apercu").css("box-shadow", "0px 0px 10px black");

        },
    });
}
