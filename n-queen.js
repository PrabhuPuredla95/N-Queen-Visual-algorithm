$(function(){
    $("#start").hide();
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

        /* Check this row on left side */
        for (i = 1; i < col; i++)
            if ($("tbody").find('tr').eq(row).find('td').eq(i).text() != "#")
            {
                $("tbody").find('tr').eq(row).find('td').eq(col).text("hit")
                $("tbody").find('tr').eq(row).find('td').eq(col).addClass("blinking")
                await sleep(1000)
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


        /* Check upper diagonal on left side */
        for (i = row, j = col; i >= 0 && j >= 1; i--, j--)
            if ($("tbody").find('tr').eq(i).find('td').eq(j).text() != "#")
            {
                $("tbody").find('tr').eq(row).find('td').eq(col).text("hit")
                $("tbody").find('tr').eq(row).find('td').eq(col).addClass("blinking")
                await sleep(1000)
                $("tbody").find('tr').eq(row).find('td').eq(col).removeClass("blinking")
                $("tbody").find('tr').eq(row).find('td').eq(col).text("#")
                return false;
            }

        /* Check lower diagonal on left side */
        for (i = row, j = col; j >= 1 && i < N; i++, j--)
            if ($("tbody").find('tr').eq(i).find('td').eq(j).text() != "#")
            {
                $("tbody").find('tr').eq(row).find('td').eq(col).text("hit")
                $("tbody").find('tr').eq(row).find('td').eq(col).addClass("blinking")
                await sleep(1000)
                $("tbody").find('tr').eq(row).find('td').eq(col).removeClass("blinking")
                $("tbody").find('tr').eq(row).find('td').eq(col).text("#")
                return false;
            }

        return true;
    }
    async function solveNQUtil(board, col, N)
    {
        /* base case: If all queens are placed
          then return true */
        await sleep(1)
            if (col > N)
                return true;
            let i;
            /* Consider this column and try placing
               this queen in all rows one by one */
            for (i = 0; i <N; i++) {
            /* Check if the queen can be placed on
              board[i][col] */
                if (await isSafe(board, i, col,N)) {
                    /* Place this queen in board[i][col] */
                    //board[i][col] = "Q";

                    //$("tbody").find('tr').eq(i).find('td').eq(col).text("Q")
                    $("tbody").find('tr').eq(i).find('td').eq(col).html("<i class=\"chess rook icon big\"></i>")
                    /* recur to place rest of the queens */
                    if (await solveNQUtil(board, col + 1, N))
                        return true;

                    /* If placing queen in board[i][col]
                       doesn't lead to a solution, then
                       remove queen from board[i][col] */
                    $("tbody").find('tr').eq(i).find('td').eq(col).text("backtrack");
                    $("tbody").find('tr').eq(i).find('td').eq(col).addClass("blinking")
                    await sleep(1000)
                    $("tbody").find('tr').eq(i).find('td').eq(col).removeClass("blinking")
                    $("tbody").find('tr').eq(i).find('td').eq(col).html("#")
                }
            }

            /* If the queen cannot be placed in any row in
                this colum col  then return false */
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


        $('thead').append(str)
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