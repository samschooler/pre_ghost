<?php
	header('Content-Type: application/json');
if(isset($_GET['posts'])) {
	 	echo '[{"title":"Two.post","tags":["new","hot","sexy"],"date":"12/3/1996","view":3123,"content":"The view of the Earth from the Moon fascinated me—a small disk, 240,000 miles away. It was hard to think that that little thing held so many problems, so many frustrations. Raging nationalistic interests, famines, wars, pestilence don\'t show from that distance.","published":true,"featured":true,"id":0},{"title":"One.post","tags":["new","hot","sexy"],"date":"12/3/1996","view":3123,"content":"From this day forward, **Flight** Control will be known by two words: ‘Tough’ and ‘Competent.’ Tough means we are forever accountable for what we do or what we fail to do. We will never again compromise our responsibilities. Every time we walk into Mission Control we will know what we stand for. Competent means we will never take anything for granted. We will never be found short in our knowledge and in our skills. Mission Control will be perfect. When you leave this meeting today you will go to your office and the first thing you will do there is to write ‘Tough and Competent’ on your blackboards. It will never be erased. Each day when you enter the room these words will remind you of the price paid by Grissom, White, and Chaffee. These words are the price of admission to the ranks of Mission Control.","published":false,"featured":false,"id":1}]';
}
else if($_GET['head']) {

}


?>