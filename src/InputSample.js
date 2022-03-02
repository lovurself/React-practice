import React, { useState, useRef } from 'react';

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    });
    // 객체 형태의 useState를 관리

    const nameInput = useRef();
    // React 자체에는 focus를 이동시켜 줄 수 없음
    // 그래서 DOM에 직접 접근하여서 해결
    // useRef는 React Hook 함수 중 하나(자세한 사항은 notion 참고)


    const { name, nickname } = inputs;
    // 사용하기 쉽게 비구조화 할당을 해줌

    const onChange = (e) => {
        const { name, value } = e.target;
        // e.target을 여러번 누르지 않기 위해 비구조화 할당을 해줌

        // const nextInputs = {
        //     ...inputs
        //     {/* 기존 inputs에 설정해둔 기본값(name, nickname)을 가지고 옴 */}
        //     [name]: value
        //     {/* name이 name이라면 name의 value값이 변경, name이 nickname라면 nickname의 value값이 변경 */}
        // }
        // setInputs(nextInputs);

        setInputs({
            ...inputs,
            [name]: value
        });
    };

    // 객체상태를 업데이트를 해주려면 기존의 상태를 한번 복사한 후 거기에 특정 값을 덮어씌우고 새로운 상태로 설정을 해주어야 함
    // 불변성을 지킨다 => 후에 배열상태를 관리할 때도 마찬가지이며, 불변성을 지켜야 컴포넌트 업데이트 성능을 최적화할 수 있음

    const onReset = () => {
        setInputs({
            name: '',
            nickname: ''
        });
        nameInput.current.focus();
        // nameInput.current는 선택한 DOM(name input)을 가리키는것
        // focus는 DOM의 API
    }

    return (
        <div>
            <input
                name='name'
                placeholder='이름'
                onChange={onChange}
                value={name}
                ref={nameInput}
                // 선택하고 싶은 DOM에 입력해줌
            />
            <input
                name='nickname'
                placeholder='닉네임'
                onChange={onChange}
                value={nickname}
            />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>입력값: </b>
                {name} ({nickname})
            </div>
        </div>
    );
}

export default InputSample;