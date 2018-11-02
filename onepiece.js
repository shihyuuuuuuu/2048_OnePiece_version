var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var row = 4;
        var col = 4;
        var width = 100;
        var padding = 10;
        var blocks = [];
        var move = false;
        var colorArr = ["#FFA488", "#FFFFBB", "#FFDDAA", "#FFAA33", "#FF7744", "#FF3333", "#FF0000", "#FFCC22", "#FF8800", "#FFFF33", "gold", "goldenrod", "orangered"];
        var imageObj = [];
        var images = [0, "luffy", "zoro", "nami", "usopp", "sanji", "chopper", "robin", "franky", "brook", "ace", "roux", "roger"];
        var head = "./images/";
        var tail = ".jpg";

        for (var i = 1; i < 13; ++i){
            imageObj[i] = new Image();
            imageObj[i].src = head.concat(images[i]).concat(tail);
        }

        for (var c = 0; c < col; c++) {
            blocks[c] = [];
            for (var r = 0; r < row; r++) {
                blocks[c][r] = { x: 0, y: 0, val: 1 };
            }
        }
        initial();
        imageObj[1].onload = function(){
            drawBlocks();
        }
    
        function initial() {
            var x1 = 0; var y1 = 0; var x2 = 0; var y2 = 0;
            while (x1 == x2 && y1 == y2) {
                x1 = Math.floor((Math.random() * 4));
                y1 = Math.floor((Math.random() * 4));
                x2 = Math.floor((Math.random() * 4));
                y2 = Math.floor((Math.random() * 4));
            }
            console.log(x1, y1, x2, y2);
            blocks[x1][y1].val = 2;
            blocks[x2][y2].val = 2;
        }

        function drawBlocks() {
            for (var c = 0; c < col; c++) {
                for (var r = 0; r < row; r++) {
                    var brickX = (c * (width + padding)) + padding;
                    var brickY = (r * (width + padding)) + padding;
                    blocks[c][r].x = brickX;
                    blocks[c][r].y = brickY;
                    
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, width, width);
                    ctx.fillStyle = colorArr[Math.log(blocks[c][r].val)/Math.log(2)];
                    ctx.fill();
                    
                    ctx.textAlign = "center";
                    ctx.font = "30px Arial";
                    ctx.fillStyle = "white";
                    if (blocks[c][r].val != 1){
                        ctx.drawImage(imageObj[Math.log(blocks[c][r].val)/Math.log(2)], brickX, brickY);
                        ctx.fillText(blocks[c][r].val, brickX + 50, brickY + 88);
                    }
                    ctx.closePath();
                }
            }
        }

        document.addEventListener("keydown", keyDownHandler, false);
        function keyDownHandler(e) {
            if (e.keyCode == 38) { // UP
                shift(1);
            } else if (e.keyCode == 40) { // DOWN
                shift(2);
            } else if (e.keyCode == 37) { // LEFT
                shift(3);
            } else if (e.keyCode == 39) { // RIGHT
                shift(4);
            }
        }

        function shift(direction) {
            switch (direction) {
                case 1: // UP
                    for (var c = 0; c < col; c++) {
                        /* 把空格補起來 */
                        for (var r = 0; r < row; r++) {
                            if (blocks[c][r].val != 1) {
                                var zero_count = 0;
                                for (var i = 0; i < r; i++) {
                                    if (blocks[c][i].val == 1)
                                        zero_count++;
                                }
                                if (zero_count != 0) {
                                    blocks[c][r - zero_count].val = blocks[c][r].val;
                                    blocks[c][r].val = 1;
                                    move = true;
                                }
                            }
                        }

                        /* 相同且相鄰的數字相加 */
                        for (var r = 0; r < row - 1; r++) {
                            if (blocks[c][r].val == blocks[c][r + 1].val && blocks[c][r].val != 1) {
                                blocks[c][r].val += blocks[c][r + 1].val;
                                blocks[c][r + 1].val = 1;
                                move = true;
                            }
                        }

                        /* 加完後再補空格 */
                        for (var r = 0; r < row; r++) {
                            var zero_count = 0;
                            for (var i = 0; i < r; i++) {
                                if (blocks[c][i].val == 1)
                                    zero_count++;
                            }
                            if (zero_count != 0) {
                                blocks[c][r - zero_count].val = blocks[c][r].val;
                                blocks[c][r].val = 1;
                            }
                        }
                    }
                    break;
                case 2: // DOWN
                    for (var c = 0; c < col; c++) {
                        for (var r = 3; r > -1; r--) {
                            if (blocks[c][r].val != 1) {
                                var zero_count = 0;
                                for (var i = 3; i > r; i--) {
                                    if (blocks[c][i].val == 1)
                                        zero_count++;
                                }
                                if (zero_count != 0) {
                                    blocks[c][r + zero_count].val = blocks[c][r].val;
                                    blocks[c][r].val = 1;
                                    move = true;
                                }
                            }
                        }
                        for (var r = 3; r > 0; r--) {
                            if (blocks[c][r].val == blocks[c][r - 1].val && blocks[c][r].val != 1) {
                                blocks[c][r].val += blocks[c][r - 1].val;
                                blocks[c][r - 1].val = 1;
                                move = true;
                            }
                        }
                        for (var r = 3; r > -1; r--) {
                            var zero_count = 0;
                            for (var i = 3; i > r; i--) {
                                if (blocks[c][i].val == 1)
                                    zero_count++;
                            }
                            if (zero_count != 0) {
                                blocks[c][r + zero_count].val = blocks[c][r].val;
                                blocks[c][r].val = 1;
                            }
                        }
                    }
                    break
                case 3: // LEFT
                    for (var r = 0; r < row; r++) {
                        for (var c = 0; c < col; c++) {
                            if (blocks[c][r].val != 1) {
                                var zero_count = 0;
                                for (var i = 0; i < c; i++) {
                                    if (blocks[i][r].val == 1)
                                        zero_count++;
                                }
                                if (zero_count != 0) {
                                    blocks[c - zero_count][r].val = blocks[c][r].val;
                                    blocks[c][r].val = 1;
                                    move = true;
                                }
                            }
                        }
                        for (var c = 0; c < col - 1; c++) {
                            if (blocks[c][r].val == blocks[c + 1][r].val && blocks[c][r].val != 1) {
                                blocks[c][r].val += blocks[c + 1][r].val;
                                blocks[c + 1][r].val = 1;
                                move = true;
                            }
                        }
                        for (var c = 0; c < col; c++) {
                            var zero_count = 0;
                            for (var i = 0; i < c; i++) {
                                if (blocks[i][r].val == 1)
                                    zero_count++;
                            }
                            if (zero_count != 0) {
                                blocks[c - zero_count][r].val = blocks[c][r].val;
                                blocks[c][r].val = 1;
                            }
                        }
                    }
                    break;
                case 4: // RIGHT
                    for (var r = 0; r < row; r++) {
                        for (var c = 3; c > -1; c--) {
                            if (blocks[c][r].val != 1) {
                                var zero_count = 0;
                                for (var i = 3; i > c; i--) {
                                    if (blocks[i][r].val == 1)
                                        zero_count++;
                                }
                                if (zero_count != 0) {
                                    blocks[c + zero_count][r].val = blocks[c][r].val;
                                    blocks[c][r].val = 1;
                                    move = true;
                                }
                            }
                        }
                        for (var c = 3; c > 0; c--) {
                            if (blocks[c][r].val == blocks[c - 1][r].val && blocks[c][r].val != 1) {
                                blocks[c][r].val += blocks[c - 1][r].val;
                                blocks[c - 1][r].val = 1;
                                move = true;
                            }
                        }
                        for (var c = 3; c > -1; c--) {
                            var zero_count = 0;
                            for (var i = 3; i > c; i--) {
                                if (blocks[i][r].val == 1)
                                    zero_count++;
                            }
                            if (zero_count != 0) {
                                blocks[c + zero_count][r].val = blocks[c][r].val;
                                blocks[c][r].val = 1;
                            }
                        }
                    }
                    break;
            }

            if (move) {
                // add test game over
                var newx = Math.floor((Math.random() * 4));
                var newy = Math.floor((Math.random() * 4));
                while (blocks[newx][newy].val != 1) {
                    newx = Math.floor((Math.random() * 4));
                    newy = Math.floor((Math.random() * 4));
                }
                new_num =  Math.floor((Math.random() * 9));
                if(new_num == 8)
                    new_num = 4;
                else
                    new_num = 2;
                blocks[newx][newy].val = new_num;
                move = false;
            }
            drawBlocks();
        }