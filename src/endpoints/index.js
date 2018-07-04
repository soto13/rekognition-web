const path = 'http://localhost:3000/api/';
const rekognition = `${path}awsrekognition/`;
const s3 = `${path}amazon-s3/`;

const TEXT = `${rekognition}text`;
const FACE = `${rekognition}face`;
const LABEL = `${rekognition}label`;
const COMPARE_FACES = `${rekognition}compare/faces`;

const GET_BUCKETS = `${s3}buckets`;
const GET_OBJECTS_IN_BUCKET = `${s3}bucket/objects`;
const CREATE_BUCKET = `${s3}create`;
const ADD_OBJECT = `${s3}add/object`;
const DELETE_BUCKET = `${s3}bucket`;
const DELETE_OBJECT_BUCKET = `${s3}object/bucket`;
const DELETE_OBJECTS_IN_BUCKET = `${s3}objects/bucket`;

export { path, TEXT, FACE, LABEL, COMPARE_FACES, GET_BUCKETS, GET_OBJECTS_IN_BUCKET, CREATE_BUCKET, ADD_OBJECT, DELETE_BUCKET, DELETE_OBJECT_BUCKET, DELETE_OBJECTS_IN_BUCKET };

