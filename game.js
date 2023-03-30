'use strict'


const textElement = document.getElementById('text')
const buttonOptionsElement = document.getElementById('option-buttons')

// will keep track of what character has on them for example goooo
let state = {}

// startGame
function startGame() {
    // state is initially empty at start of game
    state = {}

    // show the very first option
    displayTextNode(1)


}



// display the option out of the node that the user has chosen which you'll define/add down below
function displayTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    // display the text in the textNode
    textElement.innerText = textNode.text
    // get the rest of the options to disappear
    while (buttonOptionsElement.firstChild) {
        buttonOptionsElement.removeChild(buttonOptionsElement.firstChild)
    }
    // loop over our options
    textNode.options.forEach(option => {
        if (displayOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            // sets the class of the  NEW button we created to .btn so it's already styled
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            //add the button to the our button element already created in index.html
            buttonOptionsElement.appendChild(button)


        }
    })

}


// allow user to see option that they made

function displayOption(option) {
    // is there a required state? either way display the option
    return option.requiredState == null || option.requiredState(state)
}

// function that happens everytime user chooses an option
function selectOption(option) {
    // implement to get to your next option ie if nextText is 2 it'll go to text with id:2
    const nextTextNodeId = option.nextText
  
    // THIS IF STATEMENT IS USED TO RESTART GAME
    if (nextTextNodeId <= 0){
        return startGame()
    }
      // first set state to initial state and then to option.setState this will then change initial state to whatever is in object.setState 
    //so if state is = false but option.setState is = true state is now equal to true this will return a brand new object which we'll set 
    //to our current state
    state = Object.assign(state, option.setState)
    displayTextNode(nextTextNodeId)


}

const textNodes = [
    {
        id: 1,
        text: 'You wake up in a strange place and you see a jar of blue goo near you.',
        options: [
            {
                text: 'Take the goo',
                // user receives blue goo
                setState: {  blueGoo: true},
                nextText: 2
            },
            {
                text: 'Leave the goo',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You venture forth in search of answers to where you are when you come across a merchant.',
        options: [
            {
                text: 'Trade the goo for a sword',
                // will require you to have blue goo to go ahead with this option
                requiredState: (currentState) => currentState.blueGoo,
                // now you don't have blue goo you traded it for the sword
                setState: { blueGoo: false, sword: true },
                nextText: 3
            },
            {
                text: 'Trade the goo for a shield',
                requiredState: (currentState) => currentState.blueGoo,
                // now you don't have blue goo you traded it for the shield
                setState: { blueGoo: false, shield: true },

                nextText: 3
            },
            {
                text: 'Ignore the merchant',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.',
        options: [
            {
                text: 'Explore the castle',
                nextText: 4
            },
            {
                text: 'Find a room to sleep at in the town',
                nextText: 5
            },
            {
                text: 'Find some hay in a stable to sleep in',
                nextText: 6
            }
        ]
    },
    {
        //restarting the game
        id: 4,
        text: 'You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
        options: [
            {
                text: 'Explore the castle',
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'While exploring the castle you come across a horrible monster in your path.',
        options: [
            {
                text: 'Try to run',
                nextText: 8
            },
            {
                text: 'Attack it with your sword',
                requiredState:(currentState)=> currentState.sword,
                nextText: 9
            },
            {
                text: 'Hide behind your shield',
                requiredState:(currentState)=> currentState.shield,
                nextText: 10
            },
            {
                text: 'Throw the blue goo at it',
                requiredState: (currentState)=> currentState.blueGoo,
                nextText: 11
            }
        ]
    },
    {
        id: 8,
        text: 'Your attempts to run are in vain and the monster easily catches.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 9,
        text: 'You foolishly thought this monster could be slain with a single sword.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 10,
        text: 'The monster laughed as you hid behind your shield and ate you.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 11,
        text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
        options: [
            {
                text: 'Congratulations. Play Again.',
                nextText: -1
            }
        ]
    }
]





















//MY STORY START
//     {
//         id: 1,
//         text: "You find yourself standing at a fork in the road. You can either take the path to the left or the path to the right. Which path will you choose?",
//         options: [

//             {
//                 text: 'You choose the path to the left',
//                 nextText: 2
//             },
//             {
//                 text: 'You choose the path to the right',
//                 nextText: 3
//             }
//         ]

//     },
//     {
//         id: 2,
//         text: "As you walk down the path to the left, you come across a small cottage. The door is slightly ajar, and you can hear someone moving around inside. Do you knock on the door or continue down the path?",
//         options: [
//             {
//                 text: 'You knock on the door',
//                 nextText: 4
//             },
//             {
//                 text: 'You continue down the path',
//                 nextText: 5
//             }
//         ]

//     },
//     {
//         id: 3,
//         text: "You walk down the path to the right and find yourself in a dense forest. The trees are tall and the leaves are blocking out the sun. You can hear something moving in the bushes ahead. Do you investigate or turn back?",
//         options: [
//             {
//                 text: 'You investigate',
//                 nextText: 6
//             },
//             {
//                 text: 'You turn back',
//                 nextText: 7
//             }
//         ]

//     },
//     {
//         id: 4,
//         text: "You knock on the door of the cottage, and an old woman answers. She invites you in for tea and tells you stories of the magical creatures that live in the nearby woods. Do you stay for tea or politely decline and continue on your journey?",
//         options: [
//             {
//                 text: 'You stay for tea',
//                 nextText: 8
//             },
//             {
//                 text: 'You decline and continue onto your journey',
//                 nextText: 9
//             }
//         ]

//     },
//     {
//         id: 5,
//         text: "You continue down the path and come across a beautiful waterfall. The water is crystal clear and the sound of it crashing down is peaceful. Do you stop and admire the waterfall or continue down the path?",
//         options: [
//             {
//                 text: 'You stop and admire the waterfall',
//                 nextText: 10
//             },
//             {
//                 text: 'You continue down the path',
//                 nextText: 11
//             }
//         ]

//     },
//     {
//         id: 6,
//         text: "You investigate the sound in the bushes and find a small fairy caught in a spider web. She asks for your help in freeing her. Do you help her or leave her there?",
//         options: [
//             {
//                 text: 'you help her',
//                 nextText: 12
//             },
//             {
//                 text: 'you leave her',
//                 nextText: 13
//             }
//         ]

//     },

//     {
//         id: 7,
//         text: "You turn back and find yourself at the fork in the road once again. Do you take the path to the left or the path to the right?",

//         // Restarrrtttt
//         options: [
//             {
//                 text: 'Go right',
//             },
//             {
//                 text: 'Go Left',
//             }
//         ]

//     },

//     {
//         id: 8,
//         text: "After finishing your tea, the old woman tells you that you must complete a task to leave the cottage.She hands you a map and tells you to find a hidden treasure in the nearby woods. Do you accept the task or politely decline and leave?",
//         options: [
//             {
//                 text: 'You accept the task',
//                 nextText: 14
//             },
//             {
//                 text: 'You decline and leave',
//                 nextText: 15
//             }


//         ]

//     },


//     {
//         id: 9,
//         text: "You continue on your journey and come across a group of bandits. They demand you hand over all your valuables. Do you comply or try to fight them off?",
//         options: [
//             {
//                 text: 'you comply',
//                 nextText: 16
//             },
//             {
//                 text: 'you try to fight them off',
//                 nextText: 17
//             }
//         ]

//     },


//     {
//         id: 10,
//         text: "As you admire the waterfall, you notice a hidden cave behind it. Do you investigate the cave or continue down the path?",


//         options: [
//             {
//                 text: 'if you investigate the cave',
//                 nextText: 18
//             },
//             {
//                 text: 'if you continue the path',
//                 nextText: 19
//             }
//         ]

//     },


//     {
//         id: 11,
//         text: "You continue down the path and come across a group of travelers. They invite you to join them on their journey. Do you join them or decline and continue on your own journey?",
//         options: [

//             {
//                 text: 'You continue on your own journey',
//                 nextText: 20
//             },
//             {
//                 text: 'You join them',
//                 nextText: 21
//             }
//         ]

//     },

//     {
//         id: 12,
//         text: "After freeing the fairy, she thanks you by granting you a wish. What did you wish for?",
//         options: [
//             {
//                 text: 'you wish for wealth',
                // setState: { money : true},, 
//                 nextText: 22,
//             },
//             {
//                 text: 'you wish for power',
                 // setState: { power: true},

//              nextText: 23
//             },
//             {
//                 text: 'you wish for love',
                 //setState: {  love: true},
//                 nextText: 24
//             },

//         ]

//     },


//     {
//         id: 13,
//         text: "As you leave the fairy in the spider web, you feel a sense of guilt. Do you go back and help her or continue on your journey?",
//         options: [
//             {
//                 text: 'You go back and help her',
//                 nextText:12
//             },
//             {
//                 text: 'You continue on your journey',
//                 nextText:25
//             }
//         ]

//     },


//     {
//         id: 14,
//         text: "You accept the task given to you by the old woman and set off to find the hidden treasure. The map is difficult to decipher, and you encounter many obstacles along the way. Do you give up or persist until you find the treasure?",
//         options: [
//             {
//                 text: 'You give up',
//                 nextText:27
//             },
//             {
//                 text: 'You persist',
//                 nextText:28
//             }
//         ]

//     },

//     {
//         id: 15,
//         text: "As you leave the cottage, you find that the forest looks different than before. You feel lost and disoriented. Do you try to find your way back or continue exploring?",
//         options: [
//             {
//                 text: 'You try to find your way back',
//                 nextText:29
//             },
//             {
//                 text: 'You continue exploring',
//                 nextText:30
//             }
//         ]

//     },



//     {
//         id: 16,
//         text: "After handing over your valuables to the bandits, they let you go unharmed. Do you try to find a way to get your valuables back or continue on your journey?",
//         options: [
//             {
//                 text: 'You try to get them back',
//                 nextText:31
//             },
//             {
//                 text: 'You continue on your journey',
//                 nextText:32
//             }
//         ]

//     },

//     {
//         id: 17,
//         text: "You fight off the bandits successfully and continue on your journey. However, you sustained injuries in the fight. Do you seek medical attention or try to heal yourself?",
//         options: [
//             {
//                 text: 'You seek medical attention',
//                 nextText:33
//             },
//             {
//                 text: 'You feel like you will be just fine and do not seek medical attention',
//                 nextText:34
//             }
//         ]

//     },

//     {
//         id: 18,
//         text: "You enter the hidden cave and find a treasure chest full of gold and jewels. Do you take the treasure or leave it and continue on your journey?",
//         options: [
//             {
//                 text: 'You take the treasure',
//                 nextText:35
//             },
//             {
//                 text: 'You leave the treasure and continue on your journey',
//                 nextText:36
//             }
//         ]

//     },




//     {
//         id: 19,
//         text: "As you continue down the path, you come across a pack of wolves. Do you try to scare them off or slowly back away?",
//         options: [
//             {
//                 text: 'You scare them off',
//                 nextText: 37
//             },
//             {
//                 text: 'You back away',
//                 nextText:38
//             }
//         ]

//     },
//     {
//         id: 20,
//         text: "You join the group of travelers and embark on a journey with them. Along the way, you encounter many obstacles, but you also make new friends and learn new things. Do you continue traveling with them or part ways?",
//         options: [
//             {
//                 text: 'you contnue traveling with them',
//                 nextText:39
//             },
//             {
//                 text: 'You part ways',
//                 nextText:40
//             }
//         ]

//     },
//     {
//         id: 21,
//         text: "As you continue on your journey, you come across a hidden path. Do you take the path or continue on the main path",
//         options: [
//             {
//                 text: 'The hidden path of course',
//                 nextText:41
//             },
//             {
//                 text: 'Nahhhh lets stick to the main path',
//                 nextText:42
//             }
//         ]

//     },
//     {
//         id: 22,
//         text: "You wish for wealth, and the fairy grants your wish. However, you find that money does not bring you happiness. Do you try to reverse your wish or find a way to use your wealth for good?",
//         options: [
//             {
//                 text: 'You try to reverse your wish',
                    //  requiredState: (currentState) => currentState.wealth,
                    //setState:{wealth:false}
//                 nextText:43
//             },
//             {
//                 text: 'You use your wealth for good',
//                 nextText:44
//             }
//         ]

//     },
//     {
//         id: 23,
//         text: "You wish for power, and the fairy grants your wish. However, you find that power comes with a great responsibility and can be corrupting. Do you try to control your power and use it for good or give it up entirely?",
//         options: [
//             {
//                 text: 'Control your power and use it for good',
//                 nextText:45
//             },
//             {
//                 text: 'You give it up',
//                 nextText:46
//             }
//         ]

//     },
//     {
//         id: 24,
//         text: "You wish for love, and the fairy grants your wish. However, the love you find is not what you expected, and it brings you more pain than happiness. Do you try to end the relationship or work through the difficulties?",
//         options: [
//             {
//                 text: 'You try to end the relationship',
//                 nextText:47
//             },
//             {
//                 text: 'You work through the difficulties with your partner',
//                 nextText:48
//             }
//         ]

//     },
//     {
//         id: 25,
//         text: "You continue on your journey and eventually arrive at your destination, but you can't shake the feeling of guilt for leaving the fairy in the spider web.",

//     },

//     {
//         id: 27,
//         text: "You continue on your journey and eventually arrive at your destination, but you can't shake the feeling of guilt for leaving the fairy in the spider web.",


//     },
//     {
//         id: 28,
//         text: "After overcoming many obstacles, you find the hidden treasure and become rich beyond your wildest dreams.",

//     },
//     {
//         id: 29,
//         text: "You eventually find your way back to a familiar place, but it takes longer than expected.",

//     },
//     {
//         id: 30,
//         text: "As you continue exploring, you come across a beautiful clearing and feel a sense of peace.",


//     },
//     {
//         id: 31,
//         text: "You successfully retrieve your valuables from the bandits and continue on your journey.",


//     },
//     {
//         id: 32,
//         text: "You continue on your journey and eventually arrive at your destination, but you can't shake the feeling of regret for not trying to get your valuables back.",


//     },
//     {
//         id: 33,
//         text: "You seek medical attention and make a full recovery, but it takes longer than expected." 

//     },
//     {
//         id: 34,
//         text: "You attempt to heal yourself, but your injuries worsen, and you regret not seeking medical attention you die of infection ",
//         nextText:-1
//         // you die of infection restarrttt


//     },
//     {
//         id: 35,
//         text: "You take the treasure and become rich beyond your wildest dreams, but the guilt of stealing the treasure weighs heavily on you.",

//     },
//     {
//         id: 36,
//         text: "You leave the treasure and continue on your journey, feeling content with the decisions you have made.",

//     },
//     {
//         id: 37,
//         text: "You successfully scare off the pack of wolves and continue on your journey unharmed.",


//     },
//     {
//         id: 38,
//         text: "You slowly back away from the pack of wolves and eventually find a different path to your destination."
//     },
//     {
//         id: 39,
//         text: "You continue traveling with the group and have many adventures with them, creating lifelong memories.",

//     },
//     {
//         id: 40,
//         text: "You part ways with the group and continue on your journey alone, but you find that you miss the companionship.",


//     },
//     {
//         id: 41,
//         text: "As you take the hidden path, you encounter new challenges and obstacles but eventually arrive at your destination.",


//     },
//     {
//         id: 42,
//         text: "You continue on the main path and arrive at your destination without any issues",


//     },
//     {
//         id: 43,
//         text: "You attempt to reverse your wish for wealth, the fairy decides you're ungrateful now you're poor AND unhappy TRY AGAIN",
        // nextText: -1

//     },
//     {
//         id: 44,
//         text: "You find a way to use your wealth for good, becoming a philanthropist and helping those in need.",

//     },
//     {
//         id: 45,
//         text: "You control your power and use it for good, becoming a respected leader and making positive changes in your community.",


//     },
//     {
//         id: 46,
//         text: "You give up your power entirely and live a simple life, feeling content with your decision.",

//     },
//     {
//         id: 47,
//         text: "You end the painful relationship and eventually find a love that brings you true happiness.",

//     },
//     {
//         id: 48,
//         text: "You work through the difficulties in the relationship and find that it strengthens your relationship",

//     },
// ]
startGame();