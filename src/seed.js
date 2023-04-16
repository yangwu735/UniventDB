export function seedDatabase( firebase ){
    //Students seeded below
    firebase.firestore().collection('students').doc("S1").set({
        studentFirst: 'Timmy',
        studentLast: 'Turret',
        studentGrade: 9,
        studentPoints: 0,
        studentEvents: ['E1'],
    });
    firebase.firestore().collection('students').doc("S2").set({
        studentFirst: 'Alex',
        studentLast: 'Lixler',
        studentGrade: 11,
        studentPoints: 0,
        studentEvents: ['E1'],
    });
    firebase.firestore().collection('students').doc("S3").set({
        studentFirst: 'Wilbur',
        studentLast: 'Walrus',
        studentGrade: 12,
        studentPoints: 0,
        studentEvents: ['E1'],
    });
    firebase.firestore().collection('students').doc("S4").set({
        studentFirst: 'Orange',
        studentLast: 'Ophelius',
        studentGrade: 11,
        studentPoints: 0,
        studentEvents: ['E1'],
    });
    firebase.firestore().collection('students').doc("S5").set({
        studentFirst: 'Jay',
        studentLast: 'Ninjago',
        studentGrade: 10,
        studentPoints: 0,
        studentEvents: ['E1'],
    });
    firebase.firestore().collection('students').doc("S6").set({
        studentFirst: 'Jojo',
        studentLast: 'Lili',
        studentGrade: 10,
        studentPoints: 0,
        studentEvents: ['E1'],
    });

    //Events Seeded below, first 5 are sporting, last 5 are non-sporting
    firebase.firestore().collection('events').doc("E1").set({
        eventName: 'Marathon',
        eventDay: '2',
        eventMonth: 'April',
        eventYear: '2023',
        eventPoints: 1,
        eventAttendance: ['S1'],
    });
    firebase.firestore().collection('events').doc("E2").set({
        eventName: 'Football Game',
        eventDay: '16',
        eventMonth: 'January',
        eventYear: '2023',
        eventPoints: 3,
        eventAttendance: ['S1'],
    });
    firebase.firestore().collection('events').doc("E3").set({
        eventName: 'Hockey Game',
        eventDay: '22',
        eventMonth: 'February',
        eventYear: '2023',
        eventPoints: 1,
        eventAttendance: ['S1'],
    });
    firebase.firestore().collection('events').doc("E4").set({
        eventName: 'Football Game',
        eventDay: '29',
        eventMonth: 'October',
        eventYear: '2022',
        eventPoints: 3,
        eventAttendance: ['S1'],
    });
    firebase.firestore().collection('events').doc("E5").set({
        eventName: 'Bowling Game',
        eventDay: '1',
        eventMonth: 'March',
        eventYear: '2023',
        eventPoints: 1,
        eventAttendance: ['S1'],
    });
    //Nonsporting events seeded below
    firebase.firestore().collection('events').doc("E6").set({
        eventName: 'Chess Fundraiser',
        eventDay: '17',
        eventMonth: 'April',
        eventYear: '2023',
        eventPoints: 2,
        eventAttendance: ['S1'],
    });
    firebase.firestore().collection('events').doc("E7").set({
        eventName: 'Blood Donation',
        eventDay: '28',
        eventMonth: 'January',
        eventYear: '2023',
        eventPoints: 5,
        eventAttendance: ['S1'],
    });
    firebase.firestore().collection('events').doc("E8").set({
        eventName: 'Campus Cleanup',
        eventDay: '4',
        eventMonth: 'February',
        eventYear: '2023',
        eventPoints: 1,
        eventAttendance: ['S1'],
    });
    firebase.firestore().collection('events').doc("E9").set({
        eventName: 'Food Drive',
        eventDay: '2',
        eventMonth: 'March',
        eventYear: '2023',
        eventPoints: 2,
        eventAttendance: ['S1'],
    });
    firebase.firestore().collection('events').doc("E10").set({
        eventName: 'Halloween Walk and Knock',
        eventDay: '30',
        eventMonth: 'October',
        eventYear: '2022',
        eventPoints: 1,
        eventAttendance: ['S1'],
    });
}