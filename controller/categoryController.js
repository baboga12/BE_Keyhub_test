const Service = require('../services/')

const addCategory = async (req, res) => {
    try {
        const authenticationUser = req.user;
        const { name, description, tagIds, status, userIds,banner,isApproved } = req.body;

        if (!name && !status) {
            console.log('Not found name or status');
            console.log('--------------------------------------------------------------------------------------------------------------------');
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Not found name or status',
                result: null,
            });
        } else if (!name) {
            console.log('Not found field name');
            console.log('--------------------------------------------------------------------------------------------------------------------');
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Not found field name',
                result: null,
            });
        } else if (!status) {
            console.log('Not found field status');
            console.log('--------------------------------------------------------------------------------------------------------------------');
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Not found field status',
                result: null,
            });
        }

        const category = await Service.categoryService.addCategory(name, description, tagIds, status, userIds, authenticationUser.user,banner,isApproved);
        if (category == null) {
            console.log('Exits category');
            console.log('--------------------------------------------------------------------------------------------------------------------');
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Exits Category',
                result: null,
            });
        }
        console.log('Add category successfully');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Add Category Success',
            result: category
        });
    } catch (error) {
        console.log('Internal Server Error:' + error.message);
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Add Category Failed',
            error: error
        });
    }
};

const editCategory = async (req,res) =>{
    try {
        const authenticationUser = req.user;
        const {name, description, status, categoryId,isApproved } = req.body;
        let category = await Service.categoryService.editCategory(name, description, status,authenticationUser.user,categoryId,isApproved);
        if (category==null) {
            console.log('Exits category')
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Exits Category',
                result: null,
            })
        }
        if (category==1){
            console.log('User do not have permission')
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'User do not have permission',
                result: null,
            })
        }
        console.log('Edit category successfully')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Edit Category Success',
                result: category
            })
    } catch (error) {
        console.log('Internal Server Error:'+ error.message)
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Add Category Failed',
            error: error
        })
    }
}
const addTagsToCategory = async (req, res) => {
    try {
        const authenticationUser = req.user;
        const {categoryId, tagIds} = req.body;
        const category = await  Service.categoryService.addTagsToCategory(categoryId, tagIds, authenticationUser.user);
        if (category==1) {
            console.log('User do not have permission to add tags');
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 401,
                message: 'User do not have permission to add tags',
                result: null,
            })
        }
        if (category==null) {
            console.log('Not found category')
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Not found category',
                result: null,
            })
        }
        console.log('Add Tags to Category Success')
        console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Add Tags to Category Success',
                result: category
            })
    } catch (error) {
        console.log('Internal Server Error: '+ error.message)
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Add Tags to Category Failed',
            error: error
        })
    }
}
const getCategoryById = async (req, res) => {
    const categoryId = req.query.categoryId;
    const authenticatedUser = req.user;
    console.log(categoryId);
    const category = await Service.categoryService.getCategoryById(categoryId, authenticatedUser.user._id);
    if (category==null) {
        console.log('Not found category')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found category',
            result: null,
        })
    }
    console.log('Get Category Success')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Category By Id',
        result: category,
    })
}
const getAllCategory = async (req, res) => {
    const authenticationUser = req.user;
    const index = req.params.index;
    const categories = await Service.categoryService.getAllCategories(authenticationUser.user._id,index);
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Get All Categories Success',
        result: categories
    })
}
const sizeAllCategory = async (req, res) => {
    const size = await Service.categoryService.countDocumentsCategory();
    return res.status(200).json({
        success: true,
        statusCode: true,
        message: 'Size All category',
        result: size,
    })
}
const deleteCategoryById = async (req, res) => {
    const authenticationUser = req.user;
    const categoryId = req.params.categoryId;
    const category = await Service.categoryService.deleteCategoryById(categoryId, authenticationUser.user);
    if (category==null) {
        console.log('Not found category')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found category',
            result: null,
        })
    }
    if (category==1) {
        console.log('User do not have permission to delete category')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'User do not have permission to delete category',
            result: null,
        })
    }
    console.log('Delete Category Success')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Delete Category Success',
        result: null,
    })
}
const removeTags = async (req, res) => {
    const {tagIds, categoryId} = req.body;
    const authenticationUser = req.user;
    const category = await Service.categoryService.removeTagsFromCategory(tagIds, categoryId, authenticationUser.user);
    if (category==1) {
        console.log('User do not have permission to remove tags');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: 'User do not have permission to remove tags',
            result: null,
        })
    }
    if (category==null) {
        console.log('Not found category')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found category',
            result: null,
        })
    }
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Remove Tag From Category Success',
        result: category,
    })
}
const addUsersToCategory = async (req, res) => {
    try {
    const authenticationUser = req.user;
    const {categoryId, userId} = req.body;
    const invitation = await  Service.userService.invitationRequest(userId,categoryId, authenticationUser.user);
    if (invitation===5) {
        console.log('User do not have permission to add users');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 401,
            message: 'User do not have permission to add users',
            result: null,
        })
    }
    if (invitation===2) {
        console.log('Not found category')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found category',
            result: null,
        })
    }
    if (invitation===7) {
        console.log('Add User Success category')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Add User Success category',
            result: null,
        })
    }
    if (invitation===8) {
        console.log('User have been added')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User have been added',
            result: null,
        })
    }
    if (invitation===1) {
        console.log('Not found User')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found User',
            result: null,
        })
    }
    if (invitation===6) {
        console.log('User have been invited')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User have been invited',
            result: null,
        })
    }
    await Service.notificationService.notifyInvite(userId,authenticationUser.user,categoryId)
    console.log('Send request Success')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Send request Success',
        result: invitation,
    })
    } catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            result: error.message,
        });
    }
}
const acceptInvitation = async (req, res) => {
    const {categoryId, status} = req.body;
    const authenticationUser = req.user;
    const invitation = await Service.userService.acceptInvitation(categoryId,authenticationUser.user,status);
    console.log(invitation)
    if(!invitation)
    {
        console.log('Not found invitation');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found invitation',
            result: null,
        })
    }
    if (invitation===1) {
        console.log('Accept invitation successfully');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Accept invitation successfully',
            result: null,
        })
    }
    console.log('Decline invitation successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Decline invitation successfully',
        result: null,
    })
}
const listInvitations = async (req, res) => {
    const authenticationUser = req.user;
    const invitations = await Service.userService.listInvitations(authenticationUser.user);
    if(invitations===3)
    {
        console.log('List invitations');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'List invitations',
            result: null,
        })
    }
    console.log('List invitations');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'List invitations',
        result: invitations,
    })
}
// Joint Category By User Authentication
const joinCategoryByUser = async (req, res) => {
    try {
    const authenticationUser = req.user;
    const { categoryId } = req.params;
    const categoryCheck = await Service.categoryService.getCategoryById(categoryId,authenticationUser.user._id);
    if(categoryCheck.status ==='Private') {
    const userRequest = await Service.userService.requestJoin(authenticationUser.user._id, categoryId)
        if(userRequest ===5)
        {
            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Cancle Request Successfully',
                result: null,
            });
        }
        if(userRequest ===1)
        {
            return res.status(400).json({
                success: false,
                statusCode: 401,
                message: 'Not found User',
                result: null,
            });
        }
        if(userRequest ===2){
            return res.status(400).json({
                success: false,
                statusCode: 401,
                message: 'Not found Category',
                result: null,
            });
        }
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Request Join Category Success',
            result: userRequest,
        })
    }
    const category = await  Service.categoryService.addUsersToCategory(categoryId, authenticationUser.user._id);
    if (category==null) {
        console.log('Not found category')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found category',
            result: null,
        })
    }
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Join Category Success',
        result: category,
    })
    } catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            result: error.message,
        });
    }
}
const removeUser = async (req, res) => {
    const {userIds, categoryId} = req.body;
    const authenticationUser = req.user;
    const category = await Service.categoryService.removeUsersFromCategory(userIds, categoryId, authenticationUser.user);
    if (category==1) {
        console.log('User do not have permission to remove users');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 401,
            message: 'User do not have permission to remove users',
            result: null,
        })
    }
    if (category==null) {
        console.log('Not found category')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found category',
            result: null,
        })
    }
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Remove users From Category Success',
        result: category,
    })
}
//Leave User Authentication  from Category
const leaveCategory = async (req,res) => {
    try {
        const authenticationUser = req.user;
        const { categoryId } = req.params;
        const category = await  Service.userService.leaveCategory(authenticationUser.user,categoryId);
        if (category==null) {
            console.log('Not found category')
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Not found category',
                result: null,
            })
        }
        const checkRequest = await Service.categoryService.getUserStatusInCategory(category,authenticationUser.user._id);
        if(checkRequest === 'Pending') {
        const userRequest = await Service.userService.requestJoin(authenticationUser.user._id, categoryId)
        if(userRequest ===5)
        {
            console.log('Cancle Request Successfully')
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Cancle Request Successfully',
                result: null,
            });
        }
        if(userRequest ===1)
        {
            return res.status(400).json({
                success: false,
                statusCode: 401,
                message: 'Not found User',
                result: null,
            });
        }
        }
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Leave Category Success',
            result: category,
        })
        } catch (error) {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: 'Internal Server Error',
                result: error.message,
            });
        }
}
const updateAvatar = async (req,res) => {
    try {
    const authenticatedUser = req.user;
    const fileData  = req.file;
    const categoryId = req.params.categoryId;
    const categoryUpdate= await Service.categoryService.uploadAvatar(authenticatedUser.user,categoryId, fileData)
    if (categoryUpdate==1) {
        console.log('User do not have permission to edit this category');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 401,
            message: 'User do not have permission to edit this category',
            result: null,
        })
    }
    if(!categoryUpdate){
    console.log('Not found category')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
        success: true,
        statusCode: 400,
        message: 'Not found category',
        result: categoryUpdate,
    });
    }
    console.log('Updated Avatar successfully')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Change avatar updated successfully',
        result: categoryUpdate,
    });
    } catch (error) {
    return res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Internal server error',
        result: error.message,
      });
    }
}
const updateBanner = async (req,res) => {
    try {
    const authenticatedUser = req.user;
    const fileData  = req.file;
    const categoryId = req.params.categoryId;
    const categoryUpdate= await Service.categoryService.uploadAvatar(authenticatedUser.user,categoryId, fileData)
    if (categoryUpdate==1) {
        console.log('User do not have permission to edit this category');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 401,
            message: 'User do not have permission to edit this category',
            result: null,
        })
    }
    if(!categoryUpdate){
    console.log('Not found category')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Not found category',
        result: categoryUpdate,
    });
    }
    console.log('Updated Avatar successfully')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Change avatar updated successfully',
        result: categoryUpdate,
    });
    } catch (error) {
    return res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Internal server error',
        result: error.message,
    });
    }
}
const getCategoryByUser = async (req, res) => {
    try {
    const authenticatedUser = req.user;
    const index = req.params.index;
    const category = await Service.categoryService.getCategoryFromUser(authenticatedUser.user._id,index);
    if (category==null) {
        console.log('Get Category Success')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Get Category Success',
            result: null,
        })
    }
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Get Category Success',
        result: category,
    })
    } catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            result: error.message,
        });
    }
}
const getCategoryByUserIsAdmin = async (req, res) => {
    try {
    const authenticatedUser = req.user;
    const index = req.params.index;
    const category = await Service.categoryService.getCategoryFromUserIsAdmin(authenticatedUser.user._id,index);
    if (category==null) {
        console.log('Get Category Success')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Get Category Success',
            result: null,
        })
    }
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Get Category Success',
        result: category,
    })
    } catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            result: error.message,
        });
    }
}
const getCategoryByUserNotPaging = async (req, res) => {
    try {
    const authenticatedUser = req.user;
    const category = await Service.categoryService.getCategoryFromUserNotPaging(authenticatedUser.user._id);
    if (category==null) {
        console.log('Get Category Success')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Get Category Success',
            result: null,
        })
    }
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Get Category Success',
        result: category,
    })
    } catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            result: error.message,
        });
    }
}
const sizeAllCategoryByUser = async (req,res)=>{
    const authenticatedUser = req.user;
    const size  = await Service.categoryService.sizeGetALlByUser(authenticatedUser.user._id)
    return res.status(200).json({
        success: true,
        statusCode: true,
        message: 'Size All category by user',
        result: size,
    })
}
//Invitation request
const checkInvitationCode = async (req, res) => {
    try {
        const invitationCode = req.params.invitationCode;
        const authenticatedUser = req.user;
        const category = await Service.categoryService.checkInvitationCode(authenticatedUser,invitationCode );
        if (category==null) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Invalid Invitation Code',
                result: null,
            });
        }
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Category By Invitation Code',
            result: category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            result: error.message,
        });
    }
}
//Send Request with Category Private
const sendRequestJoinCategory = async (req, res) => {
    try {
        const authenticatedUser = req.user;
        const { categoryId } = req.params;
     
    } catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            result: error.message,
        });
    }
}
const listUserRequest = async (req, res) => {
    const categoryId = req.params.categoryId;
    const userRequest = await Service.userService.listUserRequest(categoryId);
    if(userRequest===1)
    {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found Category',
            result: null,
        });
    }
    if(userRequest===2){
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'This category do not have any users request',
            result: null,
        });
    }
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'List user requests',
        result: userRequest.Users,
    });
}
const evaluateRequest = async (req, res) =>{
    const {categoryId, user_id, status} = req.body;
    const authenticationUser = req.user;
    const result = await Service.categoryService.evaluateRequest(categoryId,user_id, authenticationUser.user, status);
    if(result===1)
    {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found Category',
            result: null,
        });
    }
    if(result===2){
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found User',
            result: null,
        });
    }
    if(result===3){
        return res.status(400).json({
            success: false,
            statusCode: 401,
            message: 'User do not have permission to edit this category',
            result: null,
        });
    }
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Evalue successfully',
        result: null,
    });
}
const listBlogIsApproved = async(req, res) => {
    try {
    const categoryId = req.params.categoryId;
    const authenticatedUser = req.user;
    if(!categoryId){
        console.log('CategoryId is missing')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'CategoryId is missing',
        result: null,});
    }
    const result = await Service.categoryService.listBlogIsApproved(categoryId, authenticatedUser.user);
    if(result===null)
    {
        console.log('Category not found')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Category not found',
        result: null,});
    }
    if(result===3)
    {
        console.log('You do not have permission')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'You do not have permission',
        result: null,});
    }
    console.log('List blog is approved in category')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'List blog is approved in category',
    result: result,});
    } catch (error) {
    console.log('Internal Server Error');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal Server Error',
      result: error.message,
    });
   }
}
const approvedBlog= async (req, res) => {
    const {blogId,status} = req.body;
    const authenticatedUser = req.user;
    if(!blogId) {
        console.log('Blog Id is missing')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Blog Id is missing',
        result: null,});
    }
    const result = await Service.categoryService.approvedBlog(blogId, authenticatedUser.user,status);
    if(result===null) {
        console.log('Blog not found')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Blog not found',
        result: null,});
    }
    await Service.notificationService.evaluateBlogCategory(blogId, authenticatedUser.user,status);
    console.log('Evalute blog successfully')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Evalute blog successfully',
    result: null,});
}
module.exports = {
    addCategory,
    addTagsToCategory,
    getCategoryById,
    getAllCategory,
    deleteCategoryById,
    removeTags,
    addUsersToCategory,
    removeUser,
    editCategory,
    updateAvatar,
    updateBanner,
    getCategoryByUser,
    joinCategoryByUser,
    checkInvitationCode,
    leaveCategory,
    sendRequestJoinCategory,
    listUserRequest,
    evaluateRequest,
    sizeAllCategory,
    sizeAllCategoryByUser,
    getCategoryByUserNotPaging,
    acceptInvitation,
    listInvitations,
    getCategoryByUserIsAdmin,
    listBlogIsApproved,
    approvedBlog
}