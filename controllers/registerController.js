import User from "../models/User.js";

const getSignup = async (req, res) =>{
                              try {
                                      let userDetails = await User.find();
                                      return res.status(201).json(userDetails);
                                  }catch (e)
                                  {
                                    console.log(e);
                                    return res.status(201).json(e);
                                  }
                               }


const postSignup =async (req, res) =>{
                        try
                        {
                          console.log(req.body);
                          const {name, email, password} = req.body;

                          if(!name || !email || !password)
                          {
                            console.log("Please add all the fields");
                            return res.status(422).json({error: "Please add all the fields"});
                          }

                          const email_exits = await User.findOne({email});
                          const name_exits = await User.findOne({name});
                          if(name_exits)
                          {
                            console.log("Username already registered");
                            return res.status(401).json({error: "⚠️Username already registered"});
                          }

                          if(email_exits)
                          {
                            console.log("Email already registered");
                            return res.status(401).json({error: "⚠️Email already registered"});
                          }

                          const userDetails = new User({name, email, password});
                          await userDetails.save();

                          // const token = await signupDetails.generateAuthToken();

                          console.log("Registered successfully");
                          return res.status(201).json(userDetails);

                        }catch (e)
                         {
                            console.log(e);
                            return res.status(500).json(e);
                         }
              }


export {postSignup, getSignup};
