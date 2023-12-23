$(document).ready(function () {

    const homePageTemplate = `
        <h1>Home page</h1>
    `;

    const employeePageTemplate = `
        <table id="tableEmployee" class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Gender</th>
                    <th scope="col">
                        <a href="#" data-bs-toggle="modal" data-bs-target="#newEmployeeModal">
                            + New
                        </a>

                        <div class="modal fade" id="newEmployeeModal" tabindex="-1" aria-labelledby="newEmployeeModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="newEmployeeModalLabel">New Employee</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                            <div class="mb-3">
                                                <label for="newFullName" class="form-label">Full Name</label>
                                                <input type="text" class="form-control" id="newFullName">
                                            </div>

                                            <div class="mb-3">
                                                <p><label for="gender" class="form-label">Gender</label></p>

                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="newGender" id="newGenderM" value="Male">
                                                    <label class="form-check-label" for="newGenderM">Male</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="newGender" id="newGenderF" value="Female">
                                                    <label class="form-check-label" for="newGenderF">Female</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="newGender" id="newGenderOther" value="Other">
                                                    <label class="form-check-label" for="newGenderOther">Other</label>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button id="btnSaveEmployee" type="button" class="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>

        <!-- Edit Employee Modal -->
        <div class="modal fade" id="editEmployeeModal" tabindex="-1" aria-labelledby="editEmployeeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="editEmployeeModalLabel">Edit Employee</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="editFullName" class="form-label">Full Name</label>
                                <input type="text" class="form-control" id="editFullName">
                            </div>

                            <div class="mb-3">
                                <p><label for="editGender" class="form-label">Gender</label></p>

                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="editGender" id="editGenderM" value="Male">
                                    <label class="form-check-label" for="editGenderM">Male</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="editGender" id="editGenderF" value="Female">
                                    <label class="form-check-label" for="editGenderF">Female</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="editGender" id="editGenderOther" value="Other">
                                    <label class="form-check-label" for="editGenderOther">Other</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button id="btnSaveChanges" type="button" class="btn btn-primary">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const contactPageTemplate = `
        <h1>Contact us</h1>
    `;

    function insertRowEmployees(employee) {
        $('#tableEmployee tbody').append(`
            <tr>
                <td>${employee.id}</td>
                <td>${employee.fullname}</td>
                <td>${employee.gender}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-primary btn-edit" data-employee-id="${employee.id}">Edit</button>
                        <button type="button" class="btn btn-danger btn-delete" data-employee-id="${employee.id}">Delete</button>
                    </div>
                </td>
            </tr>
        `);
    }

    function openEditEmployeeModal(employeeId) {
        // Retrieve the existing employee data using an AJAX request
        $.ajax({
            url: `http://localhost:3000/employees/${employeeId}`,
            method: 'GET',
            success: function (employee) {
                // Populate the modal with the existing employee data
                $('#editEmployeeModal #editFullName').val(employee.fullname);

                // Check the radio button corresponding to the employee's gender
                $(`#editGender${employee.gender}`).prop('checked', true);

                // Store the employee ID in a data attribute for later use
                $('#editEmployeeModal').data('employee-id', employeeId);

                // Show the modal
                $('#editEmployeeModal').modal('show');
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    // Event listener for the "Edit" button
    $('#root').on('click', '.btn-edit', function () {
        const employeeId = $(this).data('employee-id');
        openEditEmployeeModal(employeeId);
    });

    // Event listener for the "Save Changes" button in the edit employee modal
    $('#root').on('click', '#btnSaveChanges', function () {
        // Retrieve the edited data from the modal
        const editedFullName = $('#editFullName').val();
        const editedGender = $("input[name='editGender']:checked").val();

        // Retrieve the employee ID from the modal's data attribute
        const employeeId = $('#editEmployeeModal').data('employee-id');

        // Make an AJAX request to update the employee data
        $.ajax({
            url: `http://localhost:3000/employees/${employeeId}`,
            method: 'PUT',
            data: {
                "fullname": editedFullName,
                "gender": editedGender
            },
            success: function () {
                // Update the table row with the edited data
                const tableRow = $(`#tableEmployee tbody tr[data-employee-id="${employeeId}"]`);
                tableRow.find('td:eq(1)').text(editedFullName);
                tableRow.find('td:eq(2)').text(editedGender);

                // Hide the edit employee modal
                $('#editEmployeeModal').modal('hide');
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

    function saveEmployee() {
        const fullname = $('#newFullName').val();
        let gender = $("input[name='newGender']:checked").val();

        const newEmployee = {
            "fullname": fullname,
            gender
        };
        $.ajax({
            url: 'http://localhost:3000/employees',
            method: 'POST',
            data: newEmployee,
            success: function (employee) {
                insertRowEmployees(employee);
                const myModalEl = $('#newEmployeeModal');
                const modal = bootstrap.Modal.getInstance(myModalEl);
                modal.hide();
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    function loadEmployees() {
        $.ajax({
            url: 'http://localhost:3000/employees',
            method: 'GET',
            success: function (data) {
                $.each(data, function (key, employee) {
                    insertRowEmployees(employee);
                });
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    function deleteEmployee(employeeId) {
        $.ajax({
            url: `http://localhost:3000/employees/${employeeId}`,
            method: 'DELETE',
            success: function () {
                // Remove the corresponding row from the table
                $(`#tableEmployee tbody tr[data-employee-id="${employeeId}"]`).remove();
                console.log(`Employee with ID ${employeeId} deleted successfully`);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    function loadPage(pageId) {
        const pageContent = $('#root');
        switch (pageId) {
            case 'employeePage':
                document.title = 'Employees';
                pageContent.html(employeePageTemplate);
                loadEmployees();
                break;
            case 'contactPage':
                document.title = 'Contact Us';
                pageContent.html(contactPageTemplate);
                break;
            default: {
                document.title = 'Home';
                pageContent.html(homePageTemplate);
            }
        }
    }

    $('a').on('click', function (e) {
        e.preventDefault();
        const pageId = $(this).attr('href');
        loadPage(pageId);
        localStorage.setItem('pageId', pageId);
    });

    $('#root').on('click', '#btnSaveEmployee', function () {
        saveEmployee();
    });

    $('#root').on('click', '.btn-delete', function () {
        const employeeId = $(this).data('employee-id');
        deleteEmployee(employeeId);
    });

    loadPage(localStorage.getItem('pageId') ?? 'homePage');
});
