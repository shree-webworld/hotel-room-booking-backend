import User from "../models/User.js";



const postSignin = async (req, res) =>{
                                          console.log(req.body);
                                          const {email, password} = req.body;

                                          if(!email || !password)
                                          {
                                            return res.status(422).json({error: "Please add all the fields"});
                                          }

                                          try
                                          {
                                            const user_exits = await User.findOne({email, password});
                                            if (!user_exits)
                                            {
                                                  console.log("Invalid Credentials");
                                                  return res.status(404).json({error:"⚠️Invalid Credentials"});
                                            }else
                                              {
                                                    console.log("Login successfully");
                                                    // return res.status(200).json({name:user_exits.name, email:user_exits.email});
                                                    return res.status(200).json(user_exits);
                                                  }

                                          } catch (e)
                                            {
                                              console.log(e);
                                              return res.status(500).json({error: "⚠️Failed to signin"});
                                            }
                                      }





export {postSignin};
