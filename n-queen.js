$(function(){
    $("#start").hide();
    let time=1000
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    // red line when collision
    // icon for queen
    // square tds
    // message after game done
    async function isSafe(board, row, col,N)
    {
        let i, j;

        for (i = 1; i < col; i++)
            if ($("tbody").find('tr').eq(row).find('td').eq(i).text() != "#")
            {
                $("tbody").find('tr').eq(row).find('td').eq(col).text("hit")
                $("tbody").find('tr').eq(row).find('td').eq(col).addClass("blinking")
                await sleep(time)
                $("tbody").find('tr').eq(row).find('td').eq(col).removeClass("blinking")
                $("tbody").find('tr').eq(row).find('td').eq(col).text("#")

                // $("tbody").find('tr').eq(row).find('td').eq(col).text("Q")
                // for(j = i;j<=col;j++)
                // {
                //     $("tbody").find('tr').eq(row).find('td').eq(j).addClass("blinking")
                // }
                // await sleep(1610)
                // for(j = i;j<=col;j++)
                // {
                //     $("tbody").find('tr').eq(row).find('td').eq(j).removeClass("blinking")
                // }
                // $("tbody").find('tr').eq(row).find('td').eq(col).text("#")
                return false;
            }


        for (i = row, j = col; i >= 0 && j >= 1; i--, j--)
            if ($("tbody").find('tr').eq(i).find('td').eq(j).text() != "#")
            {
                $("tbody").find('tr').eq(row).find('td').eq(col).text("hit")
                $("tbody").find('tr').eq(row).find('td').eq(col).addClass("blinking")
                await sleep(time)
                $("tbody").find('tr').eq(row).find('td').eq(col).removeClass("blinking")
                $("tbody").find('tr').eq(row).find('td').eq(col).text("#")
                return false;
            }

        for (i = row, j = col; j >= 1 && i < N; i++, j--)
            if ($("tbody").find('tr').eq(i).find('td').eq(j).text() != "#")
            {
                $("tbody").find('tr').eq(row).find('td').eq(col).text("hit")
                $("tbody").find('tr').eq(row).find('td').eq(col).addClass("blinking")
                await sleep(time)
                $("tbody").find('tr').eq(row).find('td').eq(col).removeClass("blinking")
                $("tbody").find('tr').eq(row).find('td').eq(col).text("#")
                return false;
            }

        return true;
    }
    async function solveNQUtil(board, col, N)
    {
        await sleep(1)
            if (col > N)
                return true;
            let i;
            for (i = 0; i <N; i++) {
                if (await isSafe(board, i, col,N)) {

                    $("tbody").find('tr').eq(i).find('td').eq(col).html("<i class=\"chess rook icon big\"></i>")
                    if (await solveNQUtil(board, col + 1, N))
                        return true;

                    $("tbody").find('tr').eq(i).find('td').eq(col).text("backtrack");
                    $("tbody").find('tr').eq(i).find('td').eq(col).addClass("blinking")
                    await sleep(time)
                    $("tbody").find('tr').eq(i).find('td').eq(col).removeClass("blinking")
                    $("tbody").find('tr').eq(i).find('td').eq(col).html("#")
                }
            }

            return false;
    }
    let x =0;
    $('#generate').click(function () {

        //alert("clic")

        x = $('#size').val();
        let str="";
        let i,j;
        str = `<tr><th>  </th>`
        for(i =0;i<x;i++)
        {
            str = str  + `<th> ${i} </th>`
        }
        str = str + '</tr>';


        $('thead').html(str)
        $('tbody').html('')
        for(i =0;i<x;i++)
        {
            str = `<tr> <td>${i}</td> `
            for(j =0;j<x;j++)
            {
                str = str + `<td>#</td>`
            }
            str = str + `</tr>`
            $('tbody').append(str)
        }
        $("#start").show();
    });

    $('#start').click(function () {
        solveNQUtil([],1,x)
    })

});