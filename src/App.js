import { useEffect, useState } from 'react';
import './App.css';
import  {playerStats} from './mocks/players';
import Form from 'react-bootstrap/Form';


function App() {

  const [players, setPlayers] = useState([]);
  const [pickNum, setPickNum] = useState(1);
  const [order, setOrder] = useState(3);
  const [otherDrafted, setOtherDrafted] = useState([]);
  const [myDrafted, setMyDrafted] = useState([]);
  const [totalRB, setTotalRB] = useState(0);
  const [totalWR, setTotalWR] = useState(0);
  const [totalQB, setTotalQB] = useState(0);
  const [totalTE, setTotalTE] = useState(0);


  useEffect(() => {
    setPlayers(playerStats);
  }, []);

  const handleSort = (column) => {
    console.log(column);
  }

  const handleDraft = (e) => {
    const draftedPlayer = players.filter(player=> player.rank == e.target.value)[0];
    // if (window.confirm(`Are you sure you want to draft ${draftedPlayer.name}?`)) {
    if(true) {
        const position = draftedPlayer.position;
      if(position.startsWith("R")) {
        setTotalRB(totalRB + 1);
      }
      if(position.startsWith("W")) {
        setTotalWR(totalWR + 1);
      }
      if(position.startsWith("Q")) {
        setTotalQB(totalQB + 1);
      }
      if(position.startsWith("T")) {
        setTotalTE(totalTE + 1);
      }
      setPickNum(pickNum + 1);
      
      setMyDrafted([...myDrafted, draftedPlayer]);
      
      setPlayers(players.filter(player=> player.rank != e.target.value));
      }
    else {
      console.log("The action was cancelled!");
    }
    
  }



  const handleRemove = (e) => {
    const removedPlayer = players.filter(player=> player.rank == e.target.value)[0];
    // if (window.confirm(`Are you sure you want to remove ${removedPlayer.name}?`)) {
    if(true) {
    
      const position = removedPlayer.position;
      if(position.startsWith("R")) {
        setTotalRB(totalRB + 1);
      }
      if(position.startsWith("W")) {
        setTotalWR(totalWR + 1);
      }
      if(position.startsWith("Q")) {
        setTotalQB(totalQB + 1);
      }
      if(position.startsWith("T")) {
        setTotalTE(totalTE + 1);
      }
      setPickNum(pickNum + 1);
      setOtherDrafted([...otherDrafted, removedPlayer]);
      
      setPlayers(players.filter(player=> player.rank != e.target.value));
    } else {
      console.log("The action was cancelled!");
    }
   
  }

  const getPlayerClass = (position) => {
    if(position.startsWith("R")) {
      return "rb-class";
    }
    if(position.startsWith("W")) {
      return "wr-class";
    }
    if(position.startsWith("Q")) {
      return "qb-class";
    }
    if(position.startsWith("T")) {
      return "te-class";
    }
  }

  const getOrderClass = (rank) => {
    const floatOrder = parseFloat(order);
    const order2 = 1 + floatOrder + (2*(10-floatOrder));
    if(rank % 20 == order || rank % 20 == order2 || rank% 20 == order2 - 20) {
      return "default-pick";
    }
    
  }
  return (
    
   <div className="whole-page">
      <header className="App-header">
        <h1>Durham Footbal Challenges</h1>
        <h3>Draft Helper: <span style={{color:'yellow'}}>Pick #{pickNum}</span></h3>
        <p>My Pick Order</p>
        <Form.Select aria-label="League Selection" aria-placeholder="League Selection" value={order} className="mt-3 mb-4 home-select" onChange={(e)=> setOrder(e.target.value)}>
      
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
      <option value={6}>6</option>
      <option value={7}>7</option>
      <option value={8}>8</option>
      <option value={9}>9</option>
      <option value={10}>10</option>
    </Form.Select>
      </header>
       <div className="App">
       <div className="my-drafted">
      <p><u><b>My Team</b></u></p>
      {myDrafted.map((draftedPlayer, index)=> (
      <p className={getPlayerClass(draftedPlayer.position)} key={index}>{draftedPlayer.name} {draftedPlayer.position}</p>
      ))}
    </div>
        <table className="table table-striped table-bordered table-hover table-borderless table-responsive-md">
      <thead className="player-table table-primary border-top-0">
        <tr>
          <th>Draft</th>
          <th className="" onClick={() => handleSort('rank')}>Rank</th>
          <th className="" onClick={() => handleSort('name')}>Name</th>
          <th className="" onClick={() => handleSort('position')}>Position</th>
          <th className="" onClick={() => handleSort('adp')}>ADP</th>
          <th className="" onClick={() => handleSort('espn')}>ESPN</th>
          <th className="" onClick={() => handleSort('bye')}>Bye</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody className="player-data">
        {players.map((player, index) => (
          <tr key={index} >
             <td><button className="draft-button" value={player.rank} onClick={(e)=> handleDraft(e)}>Draft</button></td>
            <td className={getOrderClass(player.rank)}>{player.rank}</td>
            <td>{player.name}</td>
            <td className={getPlayerClass(player.position)}>{player.position}</td>
            <td>{player.adpPlusMinus > 0 ? `+${player.adpPlusMinus}` : player.adpPlusMinus}</td>
            <td>{player.espnRank - player.rank > 0 ? `+${player.espnRank - player.rank}` : player.espnRank - player.rank  }</td>
            <td>{player.bye}</td>
            <td><button className="remove-button"value={player.rank} onClick={(e)=> handleRemove(e)}>Remove</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="drafted">
      <p><u><b>Drafted Players</b></u></p>
      {otherDrafted.map((draftedPlayer, index)=> (
      <p className={getPlayerClass(draftedPlayer.position)} key={index}>{draftedPlayer.name} {draftedPlayer.position}</p>
      ))}
    </div>
    
    <div className="position-count">
      <p><u><b>Position Totals</b></u></p>
      <p className="rb-class">RB: {totalRB}</p>
      <p className="wr-class">WR: {totalWR}</p>
      <p className="qb-class">QB: {totalQB}</p>
      <p className="te-class">TE: {totalTE}</p>
    </div>
    <div className="notes hidden" >
      <p>3	(WR)Lamb, Hill</p>
      <p>18	(RB)Gibbs, Henry, Williams, Achane →  Harrison, Samuel</p>
      <p>23	(needed pos)Londin, Aiyuk(WR),Olave, Evans</p>
      <p>38	*Waddle(WR),Hurts(QB), Jacobs(RB), Achane(RB), *Jackson(QB), Laporta(TE), Kupp(WR) </p>
      <p>43	Jackson(QB), Cooper(WR) ^^^</p>
      <p>58	*Rice(WR), *Montgomery(RB), Richardson(QB)</p>
      <p>63	Montgomery(RB),Conner(RB)</p>
      <p>78	Mostert(RB), Murray(QB)</p>
      <p>83	Kincaid(TE), Worthy(WR), Williams(RB-safe)</p>
      <p>98 Brown(RB)</p>
      <p>103 Hopkins(WR)</p>
      <p>118 Ford(RB), Hill(TE)</p>
      <p>123 Corum, Benson</p>
      <p>138 Cooks(WR)</p>
      <br></br>
      <p>Flyers	espn	 ADP	   FP</p>
      <p>*David Montgomery	66	7th	54</p>
      <p>*Raheem Mostert	88	72	68</p>
      <p>*Jaylen Warren	89	9th	98</p>
      <p>Jerome Ford	117	12th	121</p>
      <p>*Tyler Allgeier	122	15th	150</p>
      <p>*Trey Benson	124	11th	139</p>
      <p>*Blake Corum	142	12th	127</p>
      <p>Zach Charbonnet	123	13th	145</p>
      <p>Rico Dowdle	196	13th	128</p>
      <p>Ray Davis	155	16th	148</p>
      <p>^Jordan Mason	mccaffrey backup	</p>	
      <p>^Marshawn Lloyd	GB Josh Jacobs backup	</p>	

    </div>
    </div>
    </div>
  );
}

export default App;
