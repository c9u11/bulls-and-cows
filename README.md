# Bulls and Cows

## About Bulls and Cows
"Bulls and Cows"는 한국의 숫자야구와 동일합니다.
기본적으로 생성되는 4자리의 숫자를 맞추면 이기는 게임입니다.
4자리의 숫자를 제출하면 정답에 대한 힌트를 Strike, Ball 또는 Out으로 제공합니다.
- Strike : 자리와 숫자 모두 일치함
- Ball : 숫자를 포함하지만 자리는 맞지않음
- Out : 단 하나의 숫자도 일치 하지 않음

기존의 숫자야구에서 쉬운 난이도를 추가하여 아래와 같이 개발하였습니다.
- Easy : 추측한 숫자 위치에 따른 Strike 또는 Ball 여부 제공 (EX : SXXB)
- Normal : 추측한 숫자들의 Strike 및 Ball의 총 갯수 제공 (EX : 1S 1B)